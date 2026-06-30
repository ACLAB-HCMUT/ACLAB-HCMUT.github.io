---
sidebar_position: 3
title: Intel x86 Carrier Board — High-Speed Interfaces
---

# Intel x86 Carrier Board — High-Speed Interfaces

Trang này là tài liệu tham khảo routing thực hành, từng bước cho các giao tiếp tốc độ cao trên bo
carrier Intel x86 của ACLAB (carrier cho một coreboard Intel x86, thiết kế trên **KiCad** và
gia công tại **JLCPCB** với stackup **6 lớp kiểm soát trở kháng (controlled-impedance)**).

:::danger Đây là trang rủi ro cao nhất trong mục PCB Design
Mọi giao tiếp bên dưới đều mang rủi ro về toàn vẹn tín hiệu (signal integrity), nguồn, hoặc cấu hình nền tảng. **Đừng** sao chép một quy tắc một cách mù quáng — luôn xác nhận lại theo datasheet thực tế của coreboard, thiết bị đầu cuối (endpoint), và stackup JLCPCB thực tế. Khi còn nghi ngờ, hãy kiểm chứng trước khi routing.
:::

Xem thêm: [Common PCB mistakes](/docs/pcb-design/common-mistakes) ·
[Carrier board overview](/docs/pcb-design/projects/intel-x86-carrier-overview).

## Mục tiêu toàn vẹn tín hiệu (signal integrity)

| Interface | Trở kháng mục tiêu | Ghi chú |
| --- | --- | --- |
| PCIe | Vi sai **85 Ω** | Các cặp TX/RX + REFCLK |
| HDMI (TMDS) | Vi sai **90 Ω** | Cặp clock TMDS + cặp data |
| USB 3.x | Vi sai **90 Ω** | Các cặp SuperSpeed TX/RX |
| SATA | Vi sai **~100 Ω** (KIỂM CHỨNG) | Xác nhận theo kiến trúc SATA |

Quy tắc chung cho mọi cặp trên bo:

- Dùng **stackup JLCPCB thực tế** — tính bề rộng đường và khe hở từ stackup
  (độ dày đồng + chiều cao điện môi) cho từng lớp.
- **Không tái sử dụng bề rộng trở kháng giữa các lớp** mà không tính lại theo từng lớp.
- Giữ một **mặt phẳng tham chiếu GND đặc** ngay bên dưới mọi cặp.
- **Tránh tách mặt phẳng (plane split), khoảng trống (void), và antipad** dưới các cặp.
- **Hạn chế chuyển lớp.** Khi buộc phải đổi lớp, hãy chuyển cả hai dây dẫn giống nhau
  và thêm các **via stitching GND** gần đó.
- Tránh góc 90° — dùng routing **45° hoặc bo cong/cung tròn**.
- Giữ thành viên P/N khớp về **chiều dài, số lượng via, và môi trường**.
- Đừng routing các cặp tốc độ cao trên các **đảo nguồn nhiễu (noisy power island)**.

## PCIe (ưu tiên cao nhất)

- **Các tín hiệu:**
  - `PERp` / `PERn` — cặp nhận (receive)
  - `PETp` / `PETn` — cặp phát (transmit)
  - `REFCLKp` / `REFCLKn` — clock tham chiếu

:::caution Hướng (TX/RX) là tương đối so với bên phát
Cách đặt tên TX/RX phụ thuộc vào bên nào đang phát. Hãy xác nhận hướng từ **cả** coreboard
và endpoint, rồi nối **host TX → device RX** và **host RX → device TX**.
:::

- **Nhóm lane:** một liên kết x4 được đấu theo các lane vật lý cộng với cấu hình nền tảng; giữ
  các lane 1–4 nhất quán về một endpoint/connector.
- **Tín hiệu sideband:**
  - `PERST#` — reset (host → endpoint)
  - `CLKREQ#` — yêu cầu clock (quản lý nguồn)
  - `WAKE#` — wake (endpoint → host)

:::caution Tụ AC-coupling
Các tụ AC-coupling thường nằm trên **các cặp TX**. **KIỂM CHỨNG xem coreboard đã có sẵn chúng chưa**
trước khi đặt trùng lặp. Ở những nơi tài liệu cho phép, hãy đặt chúng **gần bên phát (transmitter)**.
:::

- **Quy tắc routing (85 Ω):**
  - Ghép cặp chặt (tightly coupled) và khớp chiều dài.
  - Số via và topology bằng nhau cho P và N.
  - Đừng tách mặt phẳng tham chiếu dưới cặp.
  - Tránh stub và test pad.
  - Thêm stitching GND ở các điểm chuyển lớp.
  - Tránh xa các nút chuyển mạch (switching node) và cuộn cảm (inductor).
  - **Đừng routing dưới thạch anh (crystal), bộ tạo clock (clock generator), hay audio/analog.**
- **Nguồn:** các rail khả dĩ là `12V` / `3.3V` / `3.3Vaux` khi thiết bị yêu cầu —
  kiểm tra connector thực tế và nhu cầu của thiết bị trước khi gắn linh kiện.
- **Cơ khí connector:** nối tất cả chân shield/GND cơ khí về GND; cấp đầy đủ via GND
  gần connector và trên đường escape routing.

## M.2 Key-E (Wi-Fi + Bluetooth)

- **Tín hiệu thiết yếu:** (các) cặp PCIe TX/RX, cặp PCIe REFCLK, `PERST#`, `CLKREQ#`,
  `WAKE#` (nếu hỗ trợ), `3.3V`, `GND`, và **USB 2.0 D+/D-** (trên nhiều module, Bluetooth được
  truyền qua USB 2.0).
- **Mức logic:** thường là 3.3V — kiểm chứng theo cả module và coreboard.
- **Layout:**
  - Giữ PCIe ngắn và kiểm soát trở kháng.
  - Đặt socket với **khoảng trống cho antenna (antenna clearance)**.
  - **Không có đồng hay kim loại gần vùng antenna.**
  - Stitching GND chắc chắn.

## HDMI / DDI / DisplayPort

- **Nguồn tín hiệu:** `DDI1` từ coreboard.

:::caution DDI mơ hồ — đừng giả định chỉ là HDMI
Một cổng DDI có thể là **HDMI hoặc DisplayPort** tùy theo nền tảng và cấu hình của nó.
Hãy xác nhận chế độ thực tế trước khi thiết kế đường tín hiệu.
:::

- **Đường HDMI:** coreboard → **FPC 26 chân** → bo con HDMI bên ngoài.
  - Cặp tốc độ cao: **cặp clock TMDS + cặp data TMDS (90 Ω)**.
  - Tín hiệu hỗ trợ: `HPD`, `DDC/I2C`, một nguồn HDMI `5V` có bảo vệ/giới hạn dòng, `CEC`
    nếu cần, và **bảo vệ ESD tại connector ngoài**.
- **Logic:** xác nhận miền điện áp của `HPD`/`DDC` trước khi đấu trực tiếp — **đừng giả định
  nó an toàn ở mức 5V**.
- **Routing:** TMDS khớp chiều dài; tránh via; mặt phẳng tham chiếu không bị gián đoạn; đặt **ESD gần
  connector ngoài**, không phải giữa đường.
- **`DDI1_AUX_SEL`:** kéo lên mức **High** khi tài liệu nền tảng yêu cầu HDMI/AUX-select ở mức cao — xác nhận
  cực tính chính xác từ tài liệu coreboard.

:::note Sơ đồ đèn báo nguồn phụ thuộc nền tảng
Một sơ đồ của người dùng dùng `PWR_LED`/`PSON` để điều khiển một MOSFET kéo một nút liên quan đến DDI về GND. Hãy coi
đây là **đặc thù nền tảng** và kiểm chứng logic theo coreboard của bạn trước khi tái sử dụng.
:::

- **LVDS / eDP:**
  - Có thể để **NC** nếu không có màn hình nội bộ — sau khi kiểm chứng rằng các giao tiếp hiển thị không
    dùng đến không cần điện trở strap hay cấu hình.
  - `DDI1` HDMI và LVDS/eDP có thể cùng tồn tại **chỉ khi** pipeline của coreboard và BIOS hỗ trợ điều đó —
    hãy kiểm chứng.
  - Đừng routing LVDS/eDP tới một connector màn hình tùy ý mà không kiểm tra sơ đồ chân, điện áp,
    đèn nền (backlight), và trình tự cấp nguồn.
  - Nếu muốn hỗ trợ màn hình trong tương lai, hãy **dự trữ footprint, ESD, và các điện trở pull** ngay bây giờ.

## USB

- **USB 2.0:**
  - Routing `D+`/`D-` thành một cặp vi sai; tránh stub dài và các nhánh bất đối xứng.
  - **Hướng OC (over-current) phải được xác nhận từ coreboard** — thường là một đầu vào tới
    host từ một power switch.
- **USB 3.x (90 Ω):** cặp SuperSpeed TX, cặp SuperSpeed RX, và USB 2.0 `D+`/`D-`.
- **USB-C:**
  - Receptacle yêu cầu **xử lý hướng cắm lật (plug-flip)** — mux/PHY phải hỗ trợ cả hai
    hướng trừ khi connector/controller đã xử lý việc đó.
  - **Đừng nối tắt các lane SuperSpeed độc lập** mà chưa xác nhận topology.
  - Các chân `CC` cần cấu hình bộ điều khiển Type-C/PD hoặc điện trở đúng.
  - `VBUS` cần giới hạn dòng + bảo vệ.
- **Bảo vệ:** mảng ESD gần các connector USB ngoài; dùng một power switch USB có kiểm soát với
  báo cáo quá dòng (over-current) ở những nơi áp dụng được.

## SATA / PCIe mux

- **Khái niệm:** một số lane của coreboard được **mux giữa SATA và PCIe** — một
  nhóm lane/cổng cho trước là SATA **HOẶC** PCIe, không bao giờ cả hai cùng lúc.

:::caution Việc lựa chọn do nền tảng điều khiển
Hãy theo strap nền tảng / BIOS / tài liệu coreboard để chọn. **Đừng nối một nhóm muxed
vào SATA và PCIe đang hoạt động đồng thời.** Ghi lại tài liệu cho từng phân bổ nhóm lane.
:::

- **Routing SATA:**
  - Thường là vi sai **100 Ω** (kiểm chứng).
  - Chỉ AC coupling khi kiến trúc SATA quy định.
  - Giữ đường ngắn và liên tục trên mặt phẳng tham chiếu.
- **SATA qua FPC:** chỉ khả dĩ **khi** có FPC kiểm soát trở kháng, cáp ngắn, nối đất tin cậy,
  và sơ đồ chân đã được kiểm chứng — **rủi ro cao hơn** so với routing trực tiếp tới một connector SATA.
- **PCIe-qua-mux:** duy trì mọi quy tắc PCIe khi chế độ là PCIe; đảm bảo cấu hình BIOS/nền tảng
  khớp với triển khai vật lý.

## Thiết kế FPC (bo con HDMI & SATA)

- Dự trữ **nhiều chân GND giữa các nhóm tín hiệu tốc độ cao**.
- Dùng một **FPC kiểm soát trở kháng** cho các tín hiệu kiểu HDMI/SATA/PCIe.
- Giữ cáp **ngắn**.
- Chỉ rõ **hướng ghép nối và cách đánh số chân**.
- Đừng đặt tất cả các cặp tốc độ cao kề nhau mà không có tham chiếu GND giữa chúng.
- Thêm **ESD ở phía connector ngoài**.

:::caution FPC không phải vật thay thế chung cho một kết nối được routing
FPC chấp nhận được cho HDMI/SATA **chỉ sau khi** đã cân nhắc trở kháng cáp, tổn hao chèn (insertion loss),
nối đất, chất lượng connector, và chiều dài — nó không phải vật thay thế chung cho một kết nối được routing cẩn thận.
:::
