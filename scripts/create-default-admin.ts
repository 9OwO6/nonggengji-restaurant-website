import { createAdmin } from '../lib/auth'

async function createDefaultAdmin() {
  try {
    const password = process.env.ADMIN_PASSWORD;
    if (!password) {
      console.error('Set ADMIN_PASSWORD before running this script.');
      process.exit(1);
    }
    const result = await createAdmin({
      email: process.env.ADMIN_EMAIL || 'admin@nonggengji.ca',
      password,
      name: '系统管理员',
      role: 'super_admin'
    })

    if (result.success) {
      console.log('✅ 默认管理员账户创建成功!')
      console.log('📧 邮箱:', result.admin?.email)
      console.log('👤 姓名:', result.admin?.name)
      console.log('🔑 角色:', result.admin?.role)
    } else {
      console.error('❌ 创建默认管理员失败:', result.error)
    }
  } catch (error) {
    console.error('❌ 脚本执行出错:', error)
  }
}

// 如果直接运行此脚本则执行
if (require.main === module) {
  createDefaultAdmin()
}

export { createDefaultAdmin } 