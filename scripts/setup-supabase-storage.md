# Supabase 存储桶设置说明

为了使图片上传功能正常工作，您需要在 Supabase 中设置存储桶。

## 步骤 1: 登录 Supabase

1. 访问 [https://app.supabase.com](https://app.supabase.com)
2. 登录您的账户
3. 选择您的项目 `ghiainjyvxxhogxeuska`

## 步骤 2: 创建存储桶

1. 在左侧菜单中，点击 **Storage**
2. 点击 **"Create a new bucket"** 按钮
3. 填写以下信息：
   - **Bucket name**: `dish-images`
   - **Public bucket**: 勾选 ✅ (这样可以公开访问图片)
4. 点击 **"Create bucket"**

## 步骤 3: 设置存储策略（可选，如果自动创建了可以跳过）

如果需要手动设置策略，可以在 SQL Editor 中运行以下命令：

```sql
-- 允许管理员上传图片
CREATE POLICY "Admin can upload dish images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'dish-images');

-- 允许所有人查看图片
CREATE POLICY "Public can view dish images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'dish-images');

-- 允许管理员删除图片
CREATE POLICY "Admin can delete dish images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'dish-images');

-- 允许管理员更新图片
CREATE POLICY "Admin can update dish images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'dish-images');
```

## 完成！

设置完成后，您就可以在管理后台的"添加新菜品"页面中使用图片上传功能了。

### 功能特性：

- ✅ 支持拖拽上传
- ✅ 支持 JPEG, PNG, WebP 格式
- ✅ 文件大小限制 5MB
- ✅ 实时图片预览
- ✅ 可以删除已上传的图片
- ✅ 也可以输入图片URL（如果不想上传本地文件）
- ✅ 自动生成唯一文件名，避免冲突

上传的图片将自动保存到 Supabase 存储中，并获得一个公开的 URL 地址。 