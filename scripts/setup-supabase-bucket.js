// scripts/setup-supabase-bucket.js — requires env (never commit secrets).
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function setupStorageBucket() {
  console.log('🚀 开始设置Supabase存储桶...');

  try {
    // 检查存储桶是否已存在
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ 无法获取存储桶列表:', listError.message);
      return;
    }

    const existingBucket = buckets.find(bucket => bucket.name === 'dish-images');
    
    if (existingBucket) {
      console.log('ℹ️  存储桶 "dish-images" 已存在，跳过创建');
    } else {
      // 创建存储桶
      const { data, error } = await supabase.storage.createBucket('dish-images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      });

      if (error) {
        console.error('❌ 创建存储桶失败:', error.message);
        return;
      }

      console.log('✅ 成功创建存储桶 "dish-images"');
    }

    // 验证存储桶配置
    const { data: bucketInfo, error: infoError } = await supabase.storage.getBucket('dish-images');
    
    if (infoError) {
      console.error('❌ 无法获取存储桶信息:', infoError.message);
      return;
    }

    console.log('📦 存储桶信息:');
    console.log(`   - 名称: ${bucketInfo.name}`);
    console.log(`   - 公开访问: ${bucketInfo.public ? '是' : '否'}`);
    console.log(`   - 创建时间: ${new Date(bucketInfo.created_at).toLocaleString('zh-CN')}`);

    console.log('\n🎉 存储桶设置完成！');
    console.log('现在您可以在管理后台使用图片上传功能了。');

  } catch (error) {
    console.error('💥 设置过程中发生错误:', error);
  }
}

// 运行设置
setupStorageBucket(); 