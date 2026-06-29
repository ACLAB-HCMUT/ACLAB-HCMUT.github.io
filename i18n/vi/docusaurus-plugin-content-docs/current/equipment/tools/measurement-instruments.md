---
sidebar_position: 3
title: Dụng cụ đo
---

# Dụng cụ đo

Khi một mạch điện "không hoạt động", những công cụ này cho bạn biết **điều gì đang thực sự diễn ra** thay vì
đoán mò. Hãy chọn dụng cụ phù hợp với câu hỏi.

| Câu hỏi | Dụng cụ |
| --- | --- |
| Điện áp / thông mạch / điện trở có đúng không? | **Multimeter** |
| Tín hiệu analog này *trông như thế nào* theo thời gian? | **Oscilloscope** |
| Các đường bus digital này đang làm gì (I²C/SPI/UART)? | **Logic analyzer** |

## Multimeter (DMM)

Công cụ đầu tiên bạn cần đến. Đo điện áp DC/AC, dòng điện, điện trở, thông mạch, và
thường có cả diode/điện dung.

- **Điện áp:** đặt que đo *song song* với điểm bạn đang đo (que đỏ vào node, que đen vào GND).
- **Thông mạch:** tiếng bíp xác nhận hai điểm được nối với nhau — hoàn hảo để tìm điểm chập và
  trace đứt khi đã **tắt** nguồn.

:::danger Chế độ đo dòng có thể nổ cầu chì — hoặc tệ hơn
Để đo dòng, bạn chuyển que đỏ sang **giắc A/mA** và mắc đồng hồ *nối tiếp*
với tải. Nếu bạn để que ở giắc đo dòng rồi đi đo điện áp, bạn tạo ra một
điểm gần như chập. Luôn trả que về **giắc VΩ** khi đo xong.
:::

## Oscilloscope

Hiển thị điện áp dưới dạng dạng sóng theo thời gian — thiết yếu cho tín hiệu analog, PWM, các cạnh (edge), nhiễu, và
định thời.

- Khớp **hệ số suy giảm của que đo (probe attenuation)** (thường là **10×**) với thiết lập của kênh, nếu không mọi số đọc đều
  sai lệch 10 lần.
- Luôn nối **kẹp đất của que đo (probe ground clip)** với đất của mạch.
- Thiết lập trigger, timebase (trục ngang) và volts/div (trục dọc) sao cho dạng sóng ổn định và
  lấp đầy màn hình.

:::warning Nguy cơ về nối đất
Đất của que đo trên một scope để bàn được nối với **đất bảo vệ (earth ground)**. Kẹp nó vào một node không phải đất (hoặc
đo các mạch tham chiếu điện lưới) có thể tạo điểm chập xuyên qua scope và làm hỏng bo mạch hoặc
chính dụng cụ. Hãy biết đất của bạn ở đâu trước khi kẹp.
:::

## Logic analyzer

Bắt nhiều đường **digital** cùng lúc và giải mã các giao thức (I²C, SPI, UART, v.v.). Đúng là
công cụ cho câu hỏi "cảm biến có thực sự đang trả lời trên bus không?" — nó hiển thị các byte đã giải mã, không chỉ
điện áp.

:::tip Scope vs. logic analyzer
Dùng **scope** để đánh giá *chất lượng tín hiệu* (cạnh có sạch không, có rung không?). Dùng
**logic analyzer** để đánh giá *tính đúng đắn của giao thức* (các byte đúng có nằm trên bus đúng thời điểm
không?). Để gỡ lỗi bus nhúng, logic analyzer thường nhanh hơn.
:::

:::info Tham chiếu chéo
Những dụng cụ này kết hợp tự nhiên với [Bộ nạp & gỡ lỗi](/docs/equipment/tools/programmers-debuggers):
debugger cho bạn biết *mã* nghĩ rằng nó đang làm gì; scope/analyzer cho bạn biết *các chân*
thực sự đang làm gì. Lỗi thường nằm ở khoảng cách giữa hai điều đó.
:::
