---
sidebar_position: 2
title: Toàn vẹn tín hiệu (Signal Integrity)
---

# Toàn vẹn tín hiệu (Signal Integrity)

**Toàn vẹn tín hiệu (SI)** là giữ cho tín hiệu còn nhận diện được từ driver tới receiver. Ở tốc độ
thấp, một đường mạch chỉ là dây dẫn. Khi **sườn (edge)** trở nên nhanh so với chiều dài đường, đường
đó thành **đường truyền (transmission line)** và xuất hiện phản xạ, dao động (ringing) và crosstalk.

## Khi nào một đường trở thành đường truyền?

Quy tắc kinh nghiệm: coi là đường truyền khi đường dài hơn khoảng **1/6–1/10 khoảng cách sườn lên**.
Chính **thời gian lên (rise time)**, không phải tần số clock, mới quan trọng — clock chậm nhưng sườn
sắc vẫn gây dao động.

## Phản xạ & termination

- Sự không khớp giữa **trở kháng nguồn**, **trở kháng đường** và **tải** khiến một phần tín hiệu
  phản xạ ngược → overshoot, undershoot, ringing.
- Khắc phục bằng **termination**:
  - **Series (nguồn)** — điện trở tại driver khớp với đường (thường cho điểm-tới-điểm số).
  - **Parallel / Thevenin** — tại receiver (bus, clock nhanh).
- Đặt đường về **trở kháng kiểm soát** (xem [Trở kháng & Stackup](/docs/pcb-design/fundamentals/impedance-and-stackup)).

## Crosstalk

- Năng lượng ghép giữa các đường chạy **gần và song song**.
- Giảm: tăng khoảng cách (**quy tắc 3W** — khoảng cách ≥ 3× bề rộng đường), giữ mặt phẳng tham
  chiếu liền, rút ngắn đoạn song song, và định tuyến các lớp kề nhau **vuông góc**.

## Danh sách kiểm tra SI thực hành

- [ ] Xác định các net **nhanh** (clock, USB, DDR, SPI nhanh) — chúng cần chăm SI
- [ ] Trở kháng kiểm soát + mặt phẳng tham chiếu liền bên dưới
- [ ] Termination ở nơi datasheet/chiều dài yêu cầu
- [ ] Giữ đoạn song song ngắn; tuân thủ khoảng cách 3W
- [ ] Hạn chế via/stub trên net quan trọng

:::tip Đường hồi tiếp là một nửa của SI
Chất lượng tín hiệu phụ thuộc vào **dòng hồi tiếp** không kém gì bản thân đường mạch. Xem
[Đường hồi tiếp & Nối đất](/docs/pcb-design/fundamentals/return-paths-and-grounding).
:::

## Xem thêm

- [Tín hiệu số tốc độ cao](/docs/pcb-design/circuit-blocks/high-speed)
- [EMI / EMC](/docs/pcb-design/fundamentals/emi-emc)
- [Thiết bị đo lường](/docs/equipment/tools/measurement-instruments) — soi một vấn đề SI bằng scope
