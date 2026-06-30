---
sidebar_position: 2
title: Intel x86 Carrier Board — Power & Power Management
---

# Intel x86 Carrier Board — Power & Power Management

Ghi chú thiết kế nguồn thực hành, từng bước cho **bo carrier coreboard Intel x86** (KiCad + JLCPCB, 6 lớp). Để biết bối cảnh dự án và tổng quan bo mạch, xem [carrier board overview](/docs/pcb-design/projects/intel-x86-carrier-overview). Để biết các lỗi decoupling và layout nguồn thường gặp, xem [common mistakes](/docs/pcb-design/common-mistakes).

## Kiến trúc nguồn

- **Đầu vào chính: danh định 12V.** Có hai nguồn khả dĩ:
  - **USB-C PD** được đàm phán (negotiate) tới một profile 12V (hoặc tương thích).
  - **Adapter 12V ngoài** (jack tròn/DC jack).
- Một rail 12V duy nhất cấp cho các bộ ổn áp trên bo, từ đó tạo ra 3.3V, 5V_SBY, và logic standby.

:::danger Không bao giờ nối hai nguồn 12V với nhau
**Không** nối trực tiếp ngõ ra USB-C PD và adapter 12V ngoài vào cùng một nút. Việc một nguồn back-feed (đẩy ngược) sang nguồn kia có thể phá hỏng bộ điều khiển PD, adapter, hoặc cả hai. Hãy chọn giữa các nguồn bằng một trong các cách:

- một **power mux** (load-switch có ưu tiên/chọn), hoặc
- **ideal-diode ORing** (bộ điều khiển ideal-diode + MOSFET), hoặc
- **bảo vệ chống dòng ngược bằng MOSFET** trên mỗi nhánh đầu vào.
:::

### Các rail

| Rail | Mục đích | Ghi chú |
|------|---------|-------|
| **12V** | Đầu vào hệ thống chính | Nguồn cho slot/thiết bị PCIe khi cần; quạt và mạch nguồn |
| **3.3V** | Logic chung | M.2 Key-E; rail aux/thiết bị PCIe khi cần |
| **3.3V_AUX** (3.3Vaux) | Logic cấp nguồn standby | Các chức năng wake khi cần; hoạt động cùng miền standby |
| **5V_SBY** (VCC_5V_SBY) | Rail standby | Hoạt động khi hệ thống ở trạng thái soft-off nhưng vẫn có đầu vào; cấp nguồn cho wake, EC, sạc USB và các chức năng luôn bật |

## Bảo vệ

- Bảo vệ **chống ngược cực / dòng ngược** tại đầu vào (dựa trên MOSFET hoặc bộ điều khiển ideal-diode).
- Các clamp **TVS** ở những nơi connector ngoài cần bảo vệ chống xung sét/ESD.
- **TRÁNH đấu song song các diode Schottky** làm phần tử chia dòng chính — sự sai lệch điện áp thuận (forward-voltage) gây chia dòng không đều và trượt nhiệt (thermal runaway) ở diode nóng nhất.
- Hãy dùng một **bộ điều khiển MOSFET / ideal-diode** đúng cách để có tổn hao dẫn thấp và chia dòng có thể dự đoán, được kiểm soát.

## Quy tắc nguồn trên PCB

- Dùng **vùng đồng phủ rộng (copper pour)** cho các đường 12V dòng lớn.
- **Xác minh các vùng đã phủ thực sự kết nối** với các pad SMD mà chúng cần cấp (chạy zone refill + DRC của KiCad; kiểm tra trực quan rằng pad nằm trong vùng, không bị cô lập bởi khoảng cách clearance).
- Chọn **thermal relief hay kết nối trực tiếp (đặc)** tùy theo dòng mà pad mang và nhu cầu hàn của nó — các pad dòng lớn thường cần kết nối đặc; các pad hàn tay thì hưởng lợi từ thermal relief.
- Dùng **nhiều via** khi truyền nguồn giữa các lớp (quy tắc thô là một via cho mỗi ~0.5–1 A; chọn kích thước theo định mức dòng của via).
- **Không routing nguồn dòng lớn bên dưới** các khu vực analog/audio nhạy cảm.

:::tip
Xem [common mistakes](/docs/pcb-design/common-mistakes) để biết các lỗi decoupling và phủ đồng nguồn thường gặp nhất (vùng mồ côi, thiếu via stitching, cổ nối mỏng vào pad dòng lớn).
:::

## Tín hiệu quản lý nguồn

| Signal | Ý nghĩa | Ghi chú |
|--------|---------|-------|
| **PWR_OK** | Power-good | Được khẳng định (assert) khi các rail ổn định |
| **PSON** | Điều khiển bật nguồn | Kích hoạt các rail chính |
| **SUS** | Báo trạng thái suspend | Cho biết trạng thái suspend |
| **WAKE** | Sự kiện wake | Yêu cầu wake từ một ngoại vi/nguồn |
| **LID** | Đầu vào công tắc nắp | Có thể để không dùng nếu không cần |
| **SLEEP** | Trạng thái sleep | Cho biết trạng thái sleep |
| **BATLOW** | Pin yếu | Thường không dùng với carrier kiểu desktop |
| **WDT** | Watchdog | Trạng thái/strobe của watchdog timer |
| **THRM** | Điều khiển/trạng thái nhiệt | Throttle/cảnh báo nhiệt |
| **CB_RESET** | Reset coreboard | Xử lý cẩn thận theo tài liệu coreboard |

:::caution Triển khai tín hiệu trạng thái nguồn
- **Không** tùy tiện kéo tín hiệu trạng thái nguồn lên/xuống mà không kiểm tra **hướng** (đầu vào hay đầu ra) của từng chân.
- **Khớp điện áp pull-up** với miền I/O của coreboard — pull-up lên sai rail sẽ back-feed hoặc gây quá ứng suất cho chân.
- Giữ **các tín hiệu standby/wake luôn khả dụng** ngay cả khi không có các ngoại vi tùy chọn.
- Chỉ đánh dấu tín hiệu không dùng là **NC sau khi đã xác nhận** rằng chúng không ảnh hưởng đến việc khởi động.
:::

## Pin RTC

- Cung cấp một **holder pin cúc (coin-cell)** cộng với một **connector pin RTC** tùy chọn cho một cục pin ngoài.
- Dùng **diode ORing / cách ly** khi chuyển đổi giữa pin và một nguồn thay thế để không nguồn nào back-feed sang nguồn kia.
- Ưu tiên cách ly **dòng rò thấp (low-leakage) hoặc ideal-diode** để tối đa hóa tuổi thọ pin.

:::caution
- Xác nhận **điện áp rail RTC** và mọi **hạn chế về sạc** trước khi đấu nối.
- **Không bao giờ sạc pin cúc không thể sạc lại** — kiểm chứng hóa học của cục pin và đường sạc của rail trước khi kết nối.
:::

:::note
Để biết bối cảnh rộng hơn của bo mạch (form factor, các connector, layer stack-up), quay lại [Intel x86 carrier board overview](/docs/pcb-design/projects/intel-x86-carrier-overview).
:::
