-- Insert Categories
INSERT INTO categories (id, name, slug, description, "isActive", "createdAt", "updatedAt")
VALUES 
  ('cat1', 'Elektronik', 'elektronik', 'Elektronik cihazlar', true, NOW(), NOW()),
  ('cat2', 'Moda', 'moda', 'Giyim ve aksesuar', true, NOW(), NOW()),
  ('cat3', 'Ev & Yasam', 'ev-yasam', 'Ev dekorasyonu', true, NOW(), NOW()),
  ('cat4', 'Spor', 'spor', 'Spor malzemeleri', true, NOW(), NOW()),
  ('cat5', 'Kozmetik', 'kozmetik', 'Guzellik urunleri', true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert Products
INSERT INTO products (id, name, slug, description, sku, price, "originalPrice", stock, "categoryId", brand, "isActive", "isFeatured", "createdAt", "updatedAt")
VALUES 
  ('prod1', 'iPhone 15 Pro', 'iphone-15-pro', 'Apple iPhone 15 Pro 256GB', 'IPH15PRO', 52999, 59999, 50, 'cat1', 'Apple', true, true, NOW(), NOW()),
  ('prod2', 'Samsung Galaxy S24', 'samsung-galaxy-s24', 'Samsung Galaxy S24 128GB', 'SAMS24', 39999, 44999, 30, 'cat1', 'Samsung', true, true, NOW(), NOW()),
  ('prod3', 'Kadin Elbise', 'kadin-elbise', 'Sik elbise', 'DRESS001', 299, null, 100, 'cat2', 'Lorinyo', true, true, NOW(), NOW()),
  ('prod4', 'Modern Koltuk', 'modern-koltuk', 'Rahat koltuk', 'SOFA001', 2999, 3499, 15, 'cat3', 'Comfort', true, true, NOW(), NOW()),
  ('prod5', 'Yoga Mati', 'yoga-mati', 'Premium yoga mati', 'YOGA001', 149, null, 200, 'cat4', 'FitLife', true, false, NOW(), NOW()),
  ('prod6', 'Nemlendirici', 'nemlendirici', 'Cilt kremi', 'CREAM001', 89, null, 150, 'cat5', 'Beauty', true, true, NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;
