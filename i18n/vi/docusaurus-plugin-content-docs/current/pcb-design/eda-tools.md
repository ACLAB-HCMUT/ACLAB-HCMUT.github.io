---
sidebar_position: 2
title: Phần mềm thiết kế PCB (Công cụ EDA)
---

# Phần mềm thiết kế PCB (Công cụ EDA)

Hướng dẫn thực tế để lựa chọn một công cụ **EDA** (Electronic Design Automation): mỗi công cụ
có giá bao nhiêu, điểm mạnh và điểm yếu ra sao, công cụ nào cung cấp **giấy phép sinh viên miễn phí**,
và mất khoảng bao lâu để học.

Mọi công cụ đều tuân theo cùng một luồng làm việc — **vẽ sơ đồ nguyên lý → layout PCB → các file đầu ra để sản xuất**
(Gerber, BOM, pick-and-place). Các kiến thức nền tảng chuyển đổi được giữa các công cụ; phần mềm chủ yếu chỉ
thay đổi giao diện và hệ sinh thái xung quanh bạn.

:::tip Tóm tắt nhanh cho ACLAB
- **Học tập + hầu hết các dự án phòng lab → [KiCad](#kicad-recommended)** — miễn phí, đa nền tảng, thực sự mạnh mẽ.
- **Mô phỏng cho môn học → Proteus** — đã được sử dụng trong [môn Vi điều khiển](/courses/microcontroller).
- **Quy trình kiểu công nghiệp → Altium** (giấy phép **sinh viên** miễn phí qua email trường) hoặc **Cadence Allegro/OrCAD**.
:::

## Cách lựa chọn

- **Chi phí / cấp phép** — miễn phí so với thuê bao so với mua vĩnh viễn theo từng chỗ ngồi (per-seat).
- **Hệ sinh thái** — chất lượng thư viện, cộng đồng, hướng dẫn, mức độ sẵn có của linh kiện.
- **Quy trình mục tiêu** — thứ mà nhóm của bạn hoặc nhà tuyển dụng tương lai thực sự sử dụng.
- **Độ phức tạp của bo mạch** — số lớp, tốc độ cao/SI, RF, HDI.
- **Nền tảng** — chỉ chạy trên Windows hay đa nền tảng (Linux/macOS).

## So sánh nhanh

| Công cụ | Giấy phép | Giá (xấp xỉ) | Nền tảng | Phù hợp nhất cho |
| --- | --- | --- | --- | --- |
| **KiCad** | Mã nguồn mở (GPL) | **Miễn phí** | Win / mac / Linux | Hầu như mọi thứ |
| **LibrePCB** | Mã nguồn mở | **Miễn phí** | Win / mac / Linux | Người mới, bo mạch đơn giản |
| **EasyEDA** | Freemium (web) | Miễn phí / bản Pro trả phí | Web | Bo mạch nhanh, JLCPCB/LCSC |
| **Autodesk Eagle → Fusion** | Thương mại | Miễn phí cho sinh viên | Win / mac | Sở thích → tầm trung |
| **Altium Designer** | Thương mại | ~3–4 nghìn USD+/năm | Windows | Tiêu chuẩn công nghiệp |
| **Cadence OrCAD / Allegro** | Thương mại | $$$ (≫10 nghìn USD) | Windows | Cao cấp / tốc độ cao |
| **Siemens PADS / Xpedition** | Thương mại | $$$ | Windows | Doanh nghiệp |

:::note
Giá thay đổi thường xuyên và phụ thuộc vào phiên bản/khu vực — luôn xác nhận trên trang web của nhà cung cấp.
Các công cụ mã nguồn mở miễn phí cho mọi mục đích sử dụng, kể cả thương mại.
:::

## Miễn phí & mã nguồn mở

### KiCad (khuyến nghị)

- **Ưu điểm:** miễn phí và không giới hạn số chỗ ngồi; bộ công cụ đầy đủ (sơ đồ nguyên lý, layout, bộ định tuyến push-and-shove, trình xem 3D, SPICE); đa nền tảng; cộng đồng và thư viện khổng lồ; lý tưởng cho việc giảng dạy và phần cứng mã nguồn mở có thể tái tạo.
- **Nhược điểm:** việc quản lý thư viện/footprint cần thời gian làm quen; điều chỉnh độ dài (length-tuning) cho tín hiệu tốc độ cao chưa hoàn thiện bằng Altium; ít tích hợp sẵn với nhà cung cấp hơn (nhưng đang nhanh chóng thu hẹp khoảng cách).
- **Giá:** Miễn phí.

:::note KiCad đạt chuẩn sản xuất, không phải "đồ chơi"
Các công ty thực sự đã xuất xưởng những bo mạch phức tạp bằng KiCad. **Antmicro** công khai mã nguồn cho những thiết kế nâng cao
(FPGA, đa gigabit, bo mạch nền system-on-module) được xây dựng hoàn toàn trong KiCad — hãy duyệt
[Open Hardware Portal](https://openhardware.antmicro.com/) của họ. "Miễn phí" không có nghĩa là "giới hạn."
:::

### LibrePCB

- **Ưu điểm:** gọn gàng, đơn giản, công cụ đầu tiên tuyệt vời; đa nền tảng; hệ thống thư viện hợp nhất.
- **Nhược điểm:** ít tính năng nâng cao hơn; hệ sinh thái nhỏ hơn KiCad.
- **Giá:** Miễn phí.

## Freemium / cho người chơi nghiệp dư

### EasyEDA

- **Ưu điểm:** chạy trên trình duyệt, gần như không cần cài đặt; liên kết chặt chẽ với linh kiện **LCSC** và dịch vụ sản xuất/lắp ráp **JLCPCB**; nhanh cho các bo mạch nhỏ.
- **Nhược điểm:** thiên về điện toán đám mây; các tính năng Pro phải trả phí; ít phù hợp với các thiết kế lớn/phức tạp.
- **Giá:** Miễn phí (bản Std); bản Pro có cả gói miễn phí và trả phí.

### Autodesk Eagle (nay là Fusion Electronics)

- **Ưu điểm:** trưởng thành, rất nhiều hướng dẫn cũ; nay đã tích hợp với CAD cơ khí trong Fusion.
- **Nhược điểm:** Eagle độc lập đang bị khai tử để hợp nhất vào Fusion; cần thuê bao để dùng đầy đủ.
- **Giá:** **Giấy phép giáo dục miễn phí** với email trường học; nếu không thì là một phần của thuê bao Fusion.

## Chuyên nghiệp / thương mại

### Altium Designer

- **Ưu điểm:** trải nghiệm người dùng hoàn thiện; định tuyến tốc độ cao và điều chỉnh độ dài tương tác xuất sắc; quản lý thư viện + dữ liệu mạnh mẽ qua **Altium 365**; tiêu chuẩn công nghiệp trên thực tế.
- **Nhược điểm:** đắt đỏ; **chỉ chạy trên Windows**.
- **Giá:** thuê bao ≈ **3–4 nghìn USD+/năm**; chỗ ngồi vĩnh viễn còn đắt hơn nhiều.

:::tip Miễn phí cho sinh viên
- **Altium Education** — giấy phép miễn phí **1 năm, có thể gia hạn** với email sinh viên đã xác minh.
- **CircuitMaker** — công cụ Altium miễn phí, hướng cộng đồng (các dự án đều công khai).
- **Altium 365 Viewer** — miễn phí, dựa trên web, để xem/rà soát mà không cần giấy phép.
:::

### Cadence OrCAD / Allegro

- **Ưu điểm:** quản lý toàn vẹn tín hiệu/nguồn và ràng buộc hàng đầu; được dùng cho những bo mạch công nghiệp phức tạp, tốc độ cao nhất.
- **Nhược điểm:** rất đắt; độ khó học cao; cấp phép dựa trên chương trình doanh nghiệp/đại học.
- **Giá:** $$$ — thường vượt xa 10 nghìn USD mỗi chỗ ngồi.

:::info Bạn vẫn có thể mở file miễn phí
**Allegro FREE Physical Viewer** (tải miễn phí từ Cadence) mở và kiểm tra các bo mạch Allegro
mà không cần giấy phép — hữu ích cho việc rà soát thiết kế và học hỏi từ các layout có sẵn.
:::

### Siemens PADS / Xpedition

- **Ưu điểm:** mở rộng được từ PADS (tầm trung) đến Xpedition (tốc độ cao/HDI cấp doanh nghiệp).
- **Nhược điểm:** chi phí và độ phức tạp nhắm đến các công ty, không phải cá nhân.
- **Giá:** $$$ — báo giá theo yêu cầu.

## Giấy phép sinh viên & miễn phí (với email trường học)

| Công cụ | Cách lấy |
| --- | --- |
| **Altium Education** | Miễn phí 1 năm (gia hạn được) — xác minh bằng email sinh viên |
| **Autodesk Fusion / Eagle** | Giấy phép giáo dục miễn phí — đăng ký bằng email trường |
| **DipTrace** | Bản phi thương mại / bản sinh viên miễn phí |
| **Cadence / Siemens** | Qua chương trình đại học — hỏi giảng viên, không tự đăng ký được |
| **KiCad · LibrePCB · EasyEDA (Std)** | Miễn phí cho tất cả mọi người — không cần giấy phép |

## Trình xem miễn phí (kiểm tra thiết kế mà không cần mua)

- **Allegro FREE Physical Viewer** — bo mạch Cadence.
- **Altium 365 Viewer / Altium Designer Viewer** — dự án Altium, trên trình duyệt.
- **KiCad** — mở file của chính nó và nhập thiết kế Eagle/Altium.
- **Trình xem Gerber** — hầu hết các xưởng sản xuất (ví dụ JLCPCB, OSH Park) cung cấp trình xem trực tuyến miễn phí để kiểm tra file đầu ra cho sản xuất.

## Độ khó khi học

- **Phần cơ bản học nhanh.** Một bo mạch 2 lớp đơn giản (sơ đồ nguyên lý → layout → Gerber) có thể học được trong **vài ngày**.
- **Kỹ sư nhúng thường biết phần cơ bản** — đọc sơ đồ nguyên lý, layout đơn giản, decoupling, đầu nối — ngay cả khi thiết kế PCB không phải chuyên môn của họ.
- **Để thành thạo thì mất lâu hơn** — tốc độ cao/toàn vẹn tín hiệu, kiểm soát trở kháng, RF, HDI và EMC là một khoản đầu tư **hàng tháng đến hàng năm**.
- **Nền tảng quan trọng hơn công cụ** — sơ đồ nguyên lý tốt, nối đất và [DFM](/docs/pcb-design) đều chuyển đổi được ở mọi nơi. Hãy học **một** công cụ cho thật giỏi; chuyển đổi chủ yếu là học lại giao diện.

:::tip Bo mạch đầu tiên? Bắt đầu từ đây
Cài đặt **KiCad**, làm theo hướng dẫn bắt đầu chính thức, và layout một bo mạch breakout nhỏ cho một MCU
mà bạn đã quen (ví dụ ESP32 hoặc STM32 — xem [Firmware nhúng](/docs/embedded-firmware)).
Hãy để sẵn [danh sách kiểm tra DFM](/docs/pcb-design) trong tầm tay trước khi đặt hàng.
:::

## Tài liệu tham khảo

- [Tài liệu KiCad](https://docs.kicad.org/) — hướng dẫn và tutorial chính thức.
- [Antmicro Open Hardware Portal](https://openhardware.antmicro.com/) — các thiết kế mã nguồn mở đạt chuẩn sản xuất trong KiCad.
- [Altium Education](https://education.altium.com/) — giấy phép sinh viên miễn phí.
- Hướng dẫn DFM của nhà sản xuất — ví dụ JLCPCB, OSH Park — để biết giới hạn sản xuất thực tế.
