---
sidebar_position: 9
title: Nguồn tham khảo & Reference Design
---

# Nguồn tham khảo & Reference Design

Cách học thiết kế bo nhanh nhất là **đọc các bo mạch tốt**. Nhiều hãng và dự án công bố đầy đủ sơ
đồ nguyên lý, layout và Gerber dưới giấy phép mở — hãy nghiên cứu cách họ xử lý nguồn, decoupling,
đầu nối và định tuyến tốc độ cao, rồi áp dụng các mẫu đó vào công việc của mình.

## Phần cứng mở để nghiên cứu

| Nguồn | Là gì | Phù hợp để học |
| --- | --- | --- |
| [Antmicro Open Hardware](https://openhardware.antmicro.com/) | Thiết kế KiCad mở — board đế cho SoM, baseboard, board FPGA/AI | Định tuyến tốc độ cao, thiết kế SoM/đầu nối, thực hành KiCad hiện đại sạch sẽ |
| [Raspberry Pi](https://www.raspberrypi.com/documentation/) | Họ SBC; cơ khí + sơ đồ rút gọn | Cây nguồn, USB/Ethernet, pinout đầu nối, form factor |
| [BeagleBoard](https://www.beagleboard.org/) | SBC mở hoàn toàn (sơ đồ, layout, BOM, Gerber) | Thiết kế mở đầu-cuối, DDR/tốc độ cao, trình tự cấp nguồn |
| [Olimex](https://github.com/OLIMEX) | Bo mã nguồn mở (nguồn KiCad/Eagle) | Layout thực dụng, dễ sản xuất; nhiều khối tham khảo nhỏ |
| [Arduino](https://www.arduino.cc/en/hardware) | Sơ đồ tham khảo cho mọi bo | Khối MCU + nguồn + USB thân thiện cho người mới |
| SparkFun / Adafruit | Breakout kèm hướng dẫn đấu nối + file EDA | Ví dụ từng khối đơn lẻ (cảm biến, ổn áp, level shifter) |

Các máy tính bo mạch đơn nói chung — **Raspberry Pi, BeagleBone, Banana/Orange Pi** và các **board
đế cho SoM** mở — là tài liệu tham khảo tuyệt vời cho những phần khó: phân phối nguồn, DDR và giao
tiếp tốc độ cao, và layout đầu nối dày đặc.

## Cách đọc một bo tham khảo

1. **Cây nguồn trước** — lần theo từng đường từ đầu vào tới tải; ghi nhận lựa chọn ổn áp và trình tự.
2. **Decoupling** — bao nhiêu tụ mỗi IC, giá trị, vị trí.
3. **Đầu nối & pinout** — giao tiếp chuẩn, linh kiện ESD/bảo vệ.
4. **Tốc độ cao** — ghi chú stackup, trở kháng, khớp chiều dài, cách dùng mặt phẳng.
5. **Kỷ luật layout** — thứ tự sắp đặt, chiến lược đất, test point, silkscreen.

:::caution Giấy phép
"Mở" không phải lúc nào cũng nghĩa là "dùng lại tự do". Hãy kiểm tra **giấy phép** của từng dự án
trước khi sao chép thiết kế hay footprint vào bo của mình. Hãy học *các mẫu thiết kế*; đừng sao
chép mù quáng.
:::

## Xem thêm

- [Thiết kế theo khối mạch](/docs/pcb-design/circuit-blocks) — áp dụng điều đã học, theo từng khối
- [Máy tính bo mạch đơn](/docs/equipment/devices/single-board-computers) — có mô hình 3D tương tác
- [Hardware Viewer](/hardware-viewer) — xem Gerber của một PCB thật và một linh kiện 3D ngay trên trình duyệt
