---
sidebar_position: 1
title: Công cụ
---

# Công cụ

Công cụ là những thứ bạn **dùng lên** thiết bị của mình — để chế tạo, cấp nguồn, đo đạc, và
lập trình cho chúng. Chúng được chia thành ba nhóm:

| Nhóm | Để làm gì |
| --- | --- |
| [**Công cụ điện & cầm tay**](/docs/equipment/tools/power-hand-tools) | Cấp nguồn và lắp ráp/sửa chữa phần cứng về mặt vật lý (nguồn bàn, hàn, công cụ cầm tay). |
| [**Dụng cụ đo**](/docs/equipment/tools/measurement-instruments) | Trả lời câu hỏi "tín hiệu này thực sự đang làm gì?" (multimeter, oscilloscope, logic analyzer). |
| [**Bộ nạp & gỡ lỗi**](/docs/equipment/tools/programmers-debuggers) | Đưa mã vào chip và chạy từng bước qua mã (ST-Link, J-Link, USB-UART). |

:::tip Một quy trình gỡ lỗi
Khi có gì đó không hoạt động, hãy đi xuống theo bậc thang sau:
1. **Multimeter** — nó có được cấp nguồn không? GND có liên tục không? Điện áp trên VCC có đúng không?
2. **Logic analyzer / oscilloscope** — tín hiệu có hiện diện và có đúng hình dạng/định thời không?
3. **Debugger** — đặt một breakpoint và quan sát hành vi thực tế của mã.
:::

:::danger Trước khi cấp nguồn hoặc hàn
Hãy đọc [Nội quy & An toàn phòng lab](/docs/lab-rules): thông gió khi hàn, bảo vệ mắt, tắt
nguồn trước khi đấu dây, và xử lý LiPo/Li-ion đúng cách.
:::
