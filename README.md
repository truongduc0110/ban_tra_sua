# Bubble & Bloom

Game quản lý tiệm trà sữa 2D chạy trên web. Giao diện và nguyên liệu dùng tiếng Việt; khách nước ngoài gọi món bằng tiếng Anh để người chơi luyện phản xạ giao tiếp.

## Chạy dự án

```bash
npm install
npm run dev
```

Mặc định game chạy tại `http://localhost:4173`. Bản production:

```bash
npm run build
npm run preview
```

Máy chủ Node vừa phục vụ Vite vừa giữ endpoint `/api/grade-english`, vì vậy API key không xuất hiện trong mã frontend. Khi chạy cục bộ, máy chủ đọc cấu hình 9Router từ `/home/duc/projects/test_tool/BE/.env`. Khi triển khai nơi khác, đặt các biến:

- `NINE_ROUTER_API_KEY`
- `NINE_ROUTER_BASE_URL` (mặc định `https://9router.vocapy.com/v1`)
- `NINE_ROUTER_CONTENT_MODEL` (mặc định `cx/gpt-5.5`)

Có thể đổi đường dẫn tệp cấu hình bằng `NINE_ROUTER_ENV_FILE`.

## Luồng chơi

1. Nhập mức vốn tối đa trong ngày.
2. Nhập lá trà, sữa, đường và siro, trân châu, đá, ly và nắp. Mỗi nhóm có hạn sử dụng; hàng hết hạn bị bỏ vào đầu ngày mới.
3. Dùng các tab Kho, Nâng cấp, Giá bán, Đánh giá và Tổng kết để quản lý tiệm trước khi mở cửa. Kho có nhóm Trà & Sữa, Topping, Ly; Nâng cấp có món mới, trang bị, nhân viên và online; Giá bán hiển thị giá vốn, giá bán và lãi gộp từng món.
4. Nấu và nhập kho; chỉ mở cửa khi có đủ nhóm nguyên liệu.
5. Bán hàng trong ca 10 phút, tương ứng 11:00–22:00 trong game. Giữ nút trà để rót và thả trong vùng xanh; lựa chọn đường và đá mở khóa từ ngày 6.
6. Giá menu và phụ thu ảnh hưởng trực tiếp đến doanh thu. Nâng cấp tốc độ làm khách kiên nhẫn lâu hơn; nâng cấp ly tăng giá trị mỗi đơn. Màn Tổng kết cập nhật doanh thu, chi phí và lãi/lỗ tạm tính ngay trong ngày.
7. Khách gọi món bằng tiếng Việt. Trước khi pha, mỗi khách hỏi một câu trắc nghiệm tiếng Anh (từ vựng, ngữ pháp, giao tiếp); đồng hồ tạm dừng trong lúc trả lời.
8. Trả lời đúng: ly đó bán đủ giá và có lời. Trả lời sai: ly đó chỉ thu bằng giá vốn nguyên liệu, không có lời.
9. Nâng cấp "Câu lạc bộ tiếng Anh" thưởng thêm 2k cho mỗi câu trả lời đúng.
10. Màn Tổng kết cuối ngày hiện số câu đúng và tiền lời bị mất do trả lời sai.
11. Có thể đóng cửa sớm hoặc chờ hết ca, sau đó xem doanh thu, tiền bo, chi phí, lợi nhuận và lịch sử các ngày.

Khu chơi desktop được giới hạn ở chiều rộng 1440px và căn giữa để giữ bố cục gọn trên màn hình rộng; giao diện mobile dùng một bảng bán hàng dọc 512px căn giữa, giống bố cục game nông trại mẫu.

## Asset hình ảnh

Bộ hình vẽ raster được tạo riêng cho dự án bằng Codex ImageGen, thay cho khung màu CSS:

- `public/assets/tea-shop-counter-v2.png`: quầy pha chế và khung cảnh cửa hàng.
- `public/assets/tea-shop-characters-v2.png`: tám khách hàng.
- `public/assets/barista-v2.png`: nhân vật người chơi.
- `public/assets/tea-shop-inventory-v2.png`: mười hai biểu tượng nguyên liệu và vật dụng.
- `public/assets/tea-shop-options-v3.png`: sprite sheet 24 hình cho cỡ ly, trà, sữa, độ ngọt, topping, đá và dán nắp.
- `public/assets/sprites/*.png`: 23 sprite nền trong suốt (chồng ly, 5 bình trà, máy dán nắp, sữa, siro, thùng đá, 6 khay topping, thớt, ly trà sữa) cắt từ ảnh Codex ImageGen gốc trong `art-src/gen/`. Quầy pha chế trên canvas và các icon lựa chọn đều dùng bộ này.
- `public/assets/tea-shop-sales-9router.png`: nền bán hàng dọc được tạo qua API Image Generation của 9Router, dùng riêng cho màn hình mobile.
