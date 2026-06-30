---
sidebar_position: 1
title: Intel x86 Carrier Board — Overview
---

# Intel x86 Carrier Board — Overview

Dự án này là một **bo mạch carrier (mở rộng) dùng để gắn một coreboard Intel x86**. Coreboard cung cấp CPU, chipset, bộ nhớ và các tín hiệu I/O thô; nhiệm vụ của bo mạch carrier là biến những tín hiệu thô đó thành **các giao tiếp vật lý của một chiếc PC thực thụ**.

Mục tiêu là tích hợp các giao tiếp PC phổ biến xung quanh coreboard:

- **PCIe** (mở rộng / NVMe)
- **M.2 Key-E** cho Wi-Fi / Bluetooth
- **HDMI / DisplayPort** (xuất hình)
- **eDP / LVDS** (màn hình nội bộ, tùy chọn)
- **USB** (2.0 và 3.x)
- **SATA** (lưu trữ)
- **Audio** (codec + jack)
- **LAN** (Ethernet)
- Đầu vào **nguồn kiểu ATX**
- **Tín hiệu quản lý nguồn** (nút nguồn, PSON, power-good, đèn LED, EC/GPIO)

Bo mạch được thiết kế trên **KiCad**, gia công tại **JLCPCB**, với stackup nền tảng **6 lớp, kiểm soát trở kháng (controlled-impedance)**.

:::note
Đây là trang định hướng tổng quan. Phần công việc chi tiết được chia ra các trang con:

- [Power](/docs/pcb-design/projects/intel-x86-carrier-power)
- [High-Speed Interfaces](/docs/pcb-design/projects/intel-x86-carrier-high-speed)
- [Peripherals](/docs/pcb-design/projects/intel-x86-carrier-peripherals)
- [KiCad Workflow](/docs/pcb-design/projects/intel-x86-carrier-kicad)
:::

:::tip
Bạn mới làm quen với quy trình PCB ở đây? Hãy bắt đầu từ [PCB Design hub](/docs/pcb-design), đọc lướt qua [common mistakes](/docs/pcb-design/common-mistakes), và đọc [fabrication & ordering](/docs/pcb-design/fabrication-and-ordering) trước khi chốt stackup. Để có cái nhìn ở cấp độ sản phẩm, xem [building a product](/docs/embedded-firmware/building-a-product).
:::

## Kiến trúc hệ thống

Thiết kế được chia thành một **bo mạch carrier chính** cộng với một vài **bo con (daughterboard) bên ngoài** kết nối qua cáp FPC.

### Bo mạch carrier chính

Chứa mọi thứ cần đặt gần coreboard:

- Bản thân **coreboard** (các connector board-to-board)
- **Nguồn** vào, chuyển đổi, và các rail mux/standby
- Socket **M.2** (Key-E Wi-Fi/BT)
- **Codec audio** và jack
- Các cổng **USB**
- Các slot / connector **PCIe**
- **Các header** (nguồn, điều khiển, debug)
- **Các connector FPC** đi tới các bo con
- **Mạch điều khiển** (trình tự cấp nguồn, logic LED/PSON, phần ghép nối EC/GPIO)

### Các bo con bên ngoài

Được đưa ra khỏi bo chính để tiết kiệm không gian và cách ly các connector:

- **Bo con HDMI** — kết nối qua cáp **FPC 26 chân**
- **Bo con SATA** — kết nối qua FPC

### Giao tiếp với coreboard

Bo carrier cấp **nguồn chính (đặc biệt là 12V)** cho coreboard. Đổi lại, coreboard đưa ra các giao tiếp mà carrier phải phân phối (fan out):

| Interface | Mục đích |
| --- | --- |
| **DDI1 HDMI/DP** | Ngõ xuất video số chính |
| **LVDS / eDP** | Tấm màn hình nội bộ |
| **PCIe / PEG** | Các lane mở rộng / đồ họa |
| **SATA / PCIe mux groups** | Lưu trữ hoặc PCIe, chọn theo từng nhóm |
| **USB** | Các cổng 2.0 và 3.x |
| **HDA audio** | Liên kết High Definition Audio tới codec |
| **SMBus / I2C** | Bus điều khiển tốc độ thấp |
| **SPI BIOS** | Firmware khởi động |
| **UART** | Serial / debug |
| **GPIO / FAN / EC** | Điều khiển đa dụng, quạt, embedded controller |
| **LPC** | Bus legacy / EC |
| **Power-management signals** | PSON, power-good, nút nhấn, đèn LED, trạng thái nguồn |

## Thứ tự ưu tiên trong thiết kế

Hãy làm bo mạch theo đại khái thứ tự sau — các mục trước ràng buộc cách bố trí mặt bằng (floorplan) và stackup, nên hãy chốt chúng trước:

1. **Routing PCIe & tốc độ cao** (xác định cách đặt linh kiện và các mặt phẳng tham chiếu)
2. **Đầu vào nguồn / mux / các rail standby**
3. **HDMI / DDI & USB**
4. **M.2 Key-E Wi-Fi / BT**
5. **SATA / FPC**
6. **Audio** (ALC662 + TRRS)
7. **GPIO / EC / SMBus / UART / LPC**

## Các khu vực rủi ro cao

:::caution
Đây là những phần dễ gây ra phải làm lại bo (respin) hoặc không khởi động (non-boot) nhất. Hãy dành thêm thời gian rà soát và dự trù thời gian cho chúng:

- **Routing vi sai PCIe** — khớp chiều dài, trở kháng 85Ω, liên tục mặt tham chiếu
- **Routing HDMI / DDI** — cặp vi sai 90Ω, xử lý AUX/HPD/DDC
- **Routing USB 3.x** — vi sai 90Ω, toàn vẹn cặp SuperSpeed
- **Trình tự cấp nguồn / standby** — đúng thứ tự rail và đúng miền standby (luôn bật)
- **Cấu hình SATA / PCIe mux** — sai strap = sai chế độ = chết cổng
- **Liên tục dòng điện trở về khi đổi lớp** — mỗi via tín hiệu cần một đường trở về gần đó / stitching
:::

## Các quyết định quan trọng

| Chủ đề | Quyết định |
| --- | --- |
| Nguồn chính | Carrier cấp **12V chính** cho coreboard |
| Stackup | Nền tảng **6 lớp JLCPCB** kiểm soát trở kháng |
| Trở kháng vi sai HDMI | Vi sai **90Ω** |
| Trở kháng vi sai PCIe | Vi sai **85Ω** |
| Trở kháng vi sai USB 3.x | Vi sai **90Ω** |
| Wi-Fi / BT | Module **M.2 Key-E** |
| Audio | Codec **ALC662** + jack **TRRS** |
| Đường HDMI | Qua bo con **DDI1** + **FPC 26 chân** |
| Đường SATA | Có thể đi qua FPC, nhưng **xử lý như tín hiệu tốc độ cao kiểm soát trở kháng** |
| LVDS / eDP | Có thể để **NC** (không kết nối) nếu không có màn hình nội bộ |
| PEG | **Không dùng** nếu không có GPU rời |
| LPC | **Không dùng** nếu không có EC / thiết bị legacy |
| SATA / PCIe mux | Mỗi nhóm chọn **một chế độ** (SATA *hoặc* PCIe), không phải cả hai |

## Kiểm chứng từ tài liệu coreboard

:::caution
**Không** được giả định bất kỳ điều nào dưới đây — hãy xác nhận từng mục theo datasheet / schematic / tài liệu BIOS của coreboard trước khi routing hay đặt gia công. Giả định sai ở đây là nguyên nhân phổ biến nhất khiến bo không khởi động hoặc tối màn.

- [ ] Cấu hình & các strap của **DDI1 HDMI/DP**
- [ ] Cực tính & giá trị pull của **DDI1_AUX_SEL**
- [ ] Logic MOSFET của **PWR_LED / PSON** (mức tích cực, open-drain hay push-pull)
- [ ] **Số lane PCIe khả dụng** & ánh xạ lane-tới-cổng
- [ ] Liệu **tụ AC-coupling của PCIe** đã có sẵn trên coreboard hay chưa (tránh ghép tụ hai lần)
- [ ] Các strap & cấu hình BIOS của **SATA / PCIe mux**
- [ ] **Các miền điện áp** của các chân HPD / DDC / GPIO / USB OC / trạng thái nguồn (chèn level-shift nếu lệch mức)
- [ ] Liệu **LVDS/eDP và DDI1** có thể chạy **đồng thời** hay không
- [ ] Điện áp **pin RTC** & topology dự phòng
- [ ] Các boot strap & hành vi reset của **SPI BIOS**
- [ ] Sơ đồ chân connector chính xác & các ràng buộc cơ khí
:::
