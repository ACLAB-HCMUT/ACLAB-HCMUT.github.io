---
sidebar_position: 4
title: Chủ Đề Nâng Cao
---

# Các Chủ Đề Firmware Nâng Cao

Những kỹ năng sâu hơn tạo nên khác biệt giữa "nó nhấp nháy được" và "nó xuất xưởng được": hiểu về bộ nhớ, làm việc ở
mức register, và debug một cách có phương pháp. Hãy đến đây khi bạn đã vượt qua phần cơ bản trong
[Các Phương Pháp Tiếp Cận Firmware](/docs/embedded-firmware/firmware-approaches).

## Mô hình bộ nhớ

Một chương trình MCU sống trong một bản đồ bộ nhớ cố định mà bạn phải hiểu:

| Vùng | Nằm ở | Chứa |
| --- | --- | --- |
| `.text` / `.rodata` | **Flash** | Code và hằng số |
| `.data` | RAM (được copy từ Flash khi khởi động) | Biến toàn cục đã khởi tạo |
| `.bss` | RAM (được xóa về 0 khi khởi động) | Biến toàn cục chưa khởi tạo |
| **Heap** | RAM (lớn dần lên trên) | Các cấp phát `malloc`/`new` |
| **Stack** | RAM (lớn dần xuống dưới) | Biến cục bộ, call frame, ngữ cảnh ISR |

- **Linker script** định nghĩa các vùng này; **map file** cho thấy chính xác bạn đã dùng bao nhiêu.
- **Flash/RAM "region overflowed"** là lỗi *tại thời điểm link* — quá nhiều code hoặc dữ liệu tĩnh.
- **Heap và stack đâm vào nhau** là một sự cố *tại thời điểm chạy (runtime)* — khó chịu hơn nhiều, xem bên dưới.

## Quản lý bộ nhớ

- **Ưu tiên pool tĩnh / cố định** thay vì `malloc`/`free`. Cấp phát động trong một thiết bị chạy
  dài hạn gây ra **phân mảnh (fragmentation)** và định thời không xác định.
- **Định cỡ kèm khoảng dư** — chừa khoảng ~20–30% Flash và RAM trống cho việc mở rộng, OTA, và các stack.
- **Dữ liệu `const` nằm lại trong Flash** — đừng lãng phí RAM cho các bảng chỉ đọc.
- **Buffer DMA** cần **căn chỉnh (alignment)** đúng và, trên các lõi có cache (Cortex-M7), cần **bảo trì
  cache (cache maintenance)** nếu không các bug coherency sẽ xuất hiện thất thường.
- Dùng **MPU** (Memory Protection Unit) để bẫy các thao tác ghi lạc và bảo vệ stack.

## Các lỗi bộ nhớ thường gặp

| Lỗi | Nguyên nhân | Triệu chứng | Cách giảm thiểu |
| --- | --- | --- | --- |
| **Stack overflow** | Đệ quy sâu, biến cục bộ lớn, ISR lồng nhau, stack task RTOS quá nhỏ | Hỏng dữ liệu ngẫu nhiên, HardFault | Stack painting / high-water mark, MPU guard, định cỡ stack |
| **Phân mảnh heap** | `malloc`/`free` lặp lại với các kích cỡ khác nhau | `malloc` thất bại theo thời gian | Tránh cấp phát động; dùng memory pool |
| **Buffer overflow / vượt biên** | Ghi vượt ra ngoài mảng | Hỏng dữ liệu, lỗ hổng bảo mật | Kiểm tra biên, hàm chuỗi an toàn, phân tích tĩnh |
| **Rò rỉ bộ nhớ (memory leak)** | Cấp phát mà không bao giờ giải phóng | RAM cạn dần | Theo dõi quyền sở hữu; pool; kiểm tra leak |
| **Use-after-free / con trỏ treo (dangling)** | Dùng bộ nhớ đã giải phóng/hết hạn | Crash thất thường | Gán null sau khi free; tránh vòng đời thô |
| **Đọc giá trị chưa khởi tạo** | Dùng bộ nhớ trước khi gán | Heisenbug | Khởi tạo; bật cảnh báo compiler |

:::danger Stack overflow là sát thủ thầm lặng
Nó hiếm khi crash ngay tại nơi xảy ra — nó làm hỏng bất cứ thứ gì nằm kế tiếp trong RAM, nên bug
xuất hiện ở chỗ khác. **Bật kiểm tra stack overflow** (hook của RTOS, MPU guard, hoặc stack painting) và
kiểm tra **high-water mark** của từng task trước khi xuất xưởng.
:::

## Làm việc ở mức register

- Ngoại vi là các **register ánh xạ bộ nhớ (memory-mapped)**; hãy truy cập chúng qua các định nghĩa **CMSIS**, không phải
  các địa chỉ phép thuật.
- Khai báo register phần cứng là **`volatile`** để compiler không tối ưu bỏ đi các thao tác đọc/ghi.
- Dùng **read-modify-write** một cách cẩn thận — một RMW ngây thơ trên một register dùng chung có thể tranh chấp (race) với một ISR;
  hãy bảo vệ bằng atomic hoặc critical section.
- Nguồn chân lý của bạn là **reference manual + datasheet** — và luôn đọc phần **errata**.

## Các phương pháp debug

Hãy chọn công cụ phù hợp với câu hỏi (xem thêm [Programmer & Debugger](/docs/equipment/tools/programmers-debuggers)
và [Thiết Bị Đo Lường](/docs/equipment/tools/measurement-instruments)):

| Phương pháp | Công cụ | Phù hợp nhất cho |
| --- | --- | --- |
| **Debug trên chip (SWD/JTAG)** | ST-Link / J-Link + IDE | Breakpoint, watchpoint, single-step, kiểm tra bộ nhớ/register |
| **Logging bằng `printf`** | UART + serial console | Truy vết nhanh (nhưng can thiệp vào định thời) |
| **SEGGER RTT** | J-Link | Logging tốc độ cao với hầu như không ảnh hưởng định thời |
| **Logic analyzer / oscilloscope** | — | Giải mã bus (I²C/SPI/UART), định thời thực, glitch |
| **Giải mã fault handler** | Debugger | Tìm ra *nơi* một HardFault xuất phát |
| **Phân tích tĩnh (static analysis)** | cppcheck, clang-tidy, MISRA | Bắt bug trước khi chạy |
| **Map file + stack high-water** | Toolchain / RTOS | Lập ngân sách bộ nhớ |

:::tip Giải mã HardFault, đừng đoán
Khi một Cortex-M gặp fault, nguyên nhân nằm trong các register trạng thái fault (CFSR/HFSR) và các **register được đẩy lên stack (stacked
registers)** giữ giá trị PC tại thời điểm lỗi. Một fault handler tối thiểu in ra những thông tin này sẽ biến
"nó cứ tự reset" thành một dòng code chính xác.
:::

## Các thực hành về độ tin cậy

- **Watchdog timer** — phục hồi từ trạng thái treo về một trạng thái an toàn.
- **Phát hiện sụt áp (brown-out)** — hành vi xác định khi điện áp sụt (xem [decoupling](/docs/pcb-design/common-mistakes)).
- **Kiểm tra CRC / tính toàn vẹn** trên dữ liệu lưu trữ và các bản firmware.
- **OTA có rollback** — đừng bao giờ phát hành một đường cập nhật có thể làm "gạch hóa" (brick) thiết bị.
- **Assertion + các trạng thái an toàn xác định** cho các điều kiện ngoài phạm vi.

Xem thêm: [Xây Dựng Một Sản Phẩm](/docs/embedded-firmware/building-a-product).
