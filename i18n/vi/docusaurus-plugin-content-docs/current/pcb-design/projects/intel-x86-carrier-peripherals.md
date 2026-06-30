---
sidebar_position: 4
title: Intel x86 Carrier Board — Peripherals & Audio
---

# Intel x86 Carrier Board — Peripherals & Audio

Trang này đề cập đến các **ngoại vi tốc độ thấp và analog** trên bo carrier: audio, LAN, SPI flash BIOS, và các bus quản lý/điều khiển (SMBus/I2C, UART, GPIO/FAN/EC, LPC).

:::note
Đây là một phần của dự án bo carrier Intel x86. Hãy bắt đầu từ [overview](/docs/pcb-design/projects/intel-x86-carrier-overview) để biết kiến trúc hệ thống và thứ tự ưu tiên thiết kế. Để có cái nhìn ở cấp độ sản phẩm, xem [building a product](/docs/embedded-firmware/building-a-product).
:::

:::tip
Hầu hết các giao tiếp này "dễ" routing nhưng dễ làm **sai** ở chi tiết (pull-up, strap, mạng phân cực/bias). Hãy đọc lướt trang [common mistakes](/docs/pcb-design/common-mistakes) trước khi chốt.
:::

## Audio — Realtek ALC662 + jack TRRS

Đường audio là một codec HD Audio **Realtek ALC662** điều khiển một **jack combo TRRS 3.5mm** duy nhất (tai nghe + mic headset trong một connector).

Các tính năng mục tiêu:

- **Ngõ ra tai nghe stereo (headphone out)**
- **Ngõ vào mic (mic in)** (microphone của headset)
- **Phát hiện jack (jack detect)** khi topology jack + codec hỗ trợ

### Quy tắc thiết kế analog

- **Cách ly vùng audio analog** khỏi nguồn chuyển mạch và các giao tiếp tốc độ cao.
- Cung cấp một **đất analog (analog ground) sạch, liên tục** theo thiết kế tham chiếu của codec — đừng cắt nhỏ nó bằng các đường trở về của tín hiệu số.
- Đặt **các tụ decoupling gần các chân cấp nguồn của codec**.
- Giữ **đường tai nghe và mic ngắn**.
- **Không** routing các đường audio bên dưới các cặp vi sai **PCIe / HDMI / USB**.

### Microphone

:::caution
Một mic headset điển hình là **mono**. **Không** nối tắt MIC L và MIC R với nhau một cách mù quáng.
:::

- Dùng **topology mic đơn kênh được khuyến nghị** của codec cộng với **mạng phân cực (bias network)** của nó.
- Kiểm chứng các chân **MIC1 / VREFO** và các tụ cần thiết theo datasheet ALC662.

### Jack detect

- Dùng các chân **Sense A / Sense B**.
- Chỉ dùng jack detect **nếu** jack đã chọn và topology phát hiện của codec hỗ trợ.
- Để phát hiện đáng tin cậy kiểu laptop, hãy **làm theo thiết kế tham chiếu ALC662** một cách chính xác.

### Output

- Dùng **mạng coupling / RC / chống pop (pop-suppression) được khuyến nghị** trên ngõ ra tai nghe.
- Tôn trọng thiết kế tham chiếu của codec về **giá trị tụ và điện trở của ngõ ra tai nghe**.

### Connector

:::caution
Xác nhận sơ đồ chân **CTIA vs OMTP**. **CTIA** nhìn chung được ưa chuộng cho các headset hiện đại — chọn sai chuẩn sẽ đảo MIC và GND trên sleeve/ring.
:::

### Tóm tắt layout

- Đặt codec **gần jack** nhưng **xa các cuộn cảm nguồn**.
- Thêm **bảo vệ ESD tại jack ngoài** nếu cần.
- Giữ **các đường trở về số nhiễu (noisy digital return) tách biệt** khỏi vùng analog.

## LAN (Ethernet)

- **Magnetics là bắt buộc** giữa Ethernet PHY và RJ45.
- Xác định xem magnetics có **tích hợp trong RJ45** ("magjack") hay là **bên ngoài** — điều này thay đổi BOM và layout.
- Dùng đúng **topology common-mode choke / transformer** từ thiết kế tham chiếu của PHY.

Layout:

- Routing các **cặp MDI dạng vi sai và đối xứng**.
- Duy trì các quy tắc **rào cách ly Ethernet (isolation-barrier)** (giữ đất phía chassis và phía hệ thống tách biệt bởi rào).
- Quyết định một **chiến lược nối đất chassis / shield có chủ ý** — đừng để nó mặc nhiên/ngẫu nhiên.

## SPI BIOS

SPI BIOS là **giao tiếp flash firmware / BIOS** — bo mạch khởi động từ đó.

- Giữ **routing SPI ngắn**.
- Tuân theo cấu hình **pull-up bắt buộc**, **write-protect**, và **hold / reset**.
- **Không** để **các chân strap liên quan đến BIOS bị thả nổi (floating)**.
- Cân nhắc thêm một **header lập trình / debug ngoài** nếu khả thi (cho phép nạp lại firmware mà không cần tháo hàn chip).

## SMBus / I2C, UART, GPIO / FAN / EC, LPC

| Bus | Công dụng điển hình | Những điều cần lưu ý |
| --- | --- | --- |
| **SMBus / I2C** | Ngoại vi kiểu pin/sạc, cảm biến, EEPROM, thiết bị quản lý | Đúng **điện áp & giá trị pull-up**; tránh **điện dung bus (bus capacitance)** quá lớn |
| **UART** | Console debug, giao tiếp EC, giao tiếp ngoại vi | Đưa ra một **header debug** với GND và nhãn **TX / RX** rõ ràng |
| **GPIO / FAN / EC** | Điều khiển quạt / tachometer, chức năng EC, tính năng chung | Xác nhận **PWM của quạt là open-drain hay push-pull**; khớp điện áp pull-up; bảo vệ **đầu vào tach** |
| **LPC** | Bus EC / legacy / debug | Có thể để **không kết nối**; kiểm chứng không có **boot strap** nào đấu vào các chân LPC |

### SMBus / I2C

- Dùng cho các ngoại vi kiểu pin/sạc, cảm biến, EEPROM, và thiết bị quản lý.
- Dùng **điện áp và giá trị pull-up đúng** cho miền của bus.
- Tránh **điện dung bus quá lớn** (quá nhiều thiết bị / đường dài làm chậm các sườn xung).

### UART

- Dùng cho **console debug**, **giao tiếp EC**, và **giao tiếp ngoại vi**.
- Khuyến nghị **đưa UART ra một header debug** với **GND** và **TX / RX được dán nhãn rõ ràng**.

### GPIO / FAN / EC

- Dùng cho **điều khiển quạt / tachometer**, **chức năng EC**, và các tính năng chung.
- Cụ thể về quạt:
  - Xác nhận **PWM** là **open-drain hay push-pull**.
  - Khớp **điện áp pull-up** với quạt / controller.
  - **Bảo vệ đầu vào tach** nếu cáp đi ra khỏi bo.

### LPC

:::note
**LPC có thể để không kết nối** nếu không có EC, thiết bị legacy, hay công cụ debug nào cần đến. Trước khi làm vậy, hãy **kiểm chứng rằng các boot strap / điện trở pull bắt buộc không đấu vào các chân LPC** — ngắt kết nối chúng có thể làm thay đổi hành vi khởi động.
:::
