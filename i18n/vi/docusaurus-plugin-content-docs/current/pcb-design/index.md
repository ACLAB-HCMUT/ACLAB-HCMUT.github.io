---
slug: /pcb-design
title: Thiết kế PCB & DFM
---

# Thiết kế PCB & DFM

Thiết kế bo mạch in tin cậy và có thể sản xuất được.

## Hướng dẫn

- [**Phần mềm thiết kế PCB (Công cụ EDA)**](/docs/pcb-design/eda-tools) — so sánh, giá cả, giấy phép sinh viên miễn phí, độ khó khi học.
- [**Lỗi & Rủi ro thường gặp**](/docs/pcb-design/common-mistakes) — decoupling, crosstalk, cặp tín hiệu vi sai, các cạm bẫy về DFM/sản xuất.
- [**Từ thiết kế đến giao hàng**](/docs/pcb-design/fabrication-and-ordering) — DRC, các file đầu ra, lựa chọn đặt hàng, vận chuyển & hải quan (nghiên cứu trường hợp JLCPCB).

## Chủ đề

- **Vẽ sơ đồ nguyên lý (schematic capture):** ký hiệu, nets, tái sử dụng thiết kế
- **Layout:** sắp đặt linh kiện, định tuyến, mặt phẳng nguồn/đất, toàn vẹn tín hiệu
- **Nguồn:** LDO, buck/boost, decoupling
- **DFM:** quy tắc thiết kế, stackup, ràng buộc về sản xuất & lắp ráp
- **Bring-up:** lần cấp nguồn đầu tiên, gỡ lỗi phần cứng

## Công cụ

- **Phần mềm:** xem [Phần mềm thiết kế PCB (Công cụ EDA)](/docs/pcb-design/eda-tools) — so sánh,
  giá cả, giấy phép sinh viên miễn phí và độ khó khi học. KiCad được ưu tiên (miễn phí, mạnh mẽ).
- **Công cụ bàn làm việc (bench tools):** multimeter, oscilloscope, nguồn bàn — xem [Hướng dẫn thiết bị phòng lab](/docs/equipment/tools/measurement-instruments).

## Danh sách kiểm tra DFM (ngắn gọn)

- [ ] Quy tắc thiết kế phù hợp với năng lực của xưởng sản xuất
- [ ] Decoupling đúng cách trên mọi IC
- [ ] Silkscreen, fiducials và test points rõ ràng
- [ ] Đã rà soát BOM và footprint trước khi đặt hàng
