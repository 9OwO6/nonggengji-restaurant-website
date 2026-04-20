-- 创建存储桶用于菜品图片
INSERT INTO storage.buckets (id, name, public) 
VALUES ('dish-images', 'dish-images', true);

-- 创建存储策略 - 允许管理员上传图片
CREATE POLICY "Admin can upload dish images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'dish-images');

-- 创建存储策略 - 所有人可以查看图片
CREATE POLICY "Public can view dish images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'dish-images');

-- 创建存储策略 - 管理员可以删除图片
CREATE POLICY "Admin can delete dish images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'dish-images');

-- 创建存储策略 - 管理员可以更新图片
CREATE POLICY "Admin can update dish images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'dish-images'); 