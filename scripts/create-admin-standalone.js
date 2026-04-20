// Standalone admin bootstrap — requires env (never commit secrets).
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createDefaultAdmin() {
  try {
    console.log('开始创建默认管理员账户...');
    
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error('Set ADMIN_PASSWORD for the new admin user.');
      process.exit(1);
    }

    const adminData = {
      email: process.env.ADMIN_EMAIL || 'admin@nonggengji.ca',
      password: adminPassword,
      name: '系统管理员',
      role: 'super_admin'
    };

    // 加密密码
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

    // 检查是否已存在
    const { data: existingAdmin } = await supabase
      .from('admins')
      .select('email')
      .eq('email', adminData.email)
      .single();

    if (existingAdmin) {
      console.log('ℹ️  管理员账户已存在，跳过创建');
      console.log('📧 邮箱:', adminData.email);
      console.log('🔑 密码: (set via ADMIN_PASSWORD)');
      return;
    }

    // 创建管理员
    const { data, error } = await supabase
      .from('admins')
      .insert({
        email: adminData.email,
        password_hash: hashedPassword,
        name: adminData.name,
        role: adminData.role,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('❌ 创建失败:', error);
      return;
    }

    console.log('✅ 默认管理员账户创建成功!');
    console.log('📧 邮箱:', data.email);
    console.log('👤 姓名:', data.name);
    console.log('🔑 角色:', data.role);
    console.log('');
    console.log('🔐 登录信息:');
    console.log('邮箱:', adminData.email);
    console.log('密码: (the value you set in ADMIN_PASSWORD)');
    console.log('');
    console.log('管理员后台地址: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('❌ 脚本执行出错:', error);
  }
}

createDefaultAdmin(); 