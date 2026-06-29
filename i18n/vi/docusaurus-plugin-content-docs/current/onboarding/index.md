---
slug: /onboarding
title: Nhập môn thành viên
---

# Nhập môn thành viên

Chào mừng bạn đến với **ACLAB**! Hướng dẫn này giúp thành viên mới nhanh chóng bắt nhịp trong
những tuần đầu tiên — bao gồm tài khoản, phần mềm cần cài đặt (theo lĩnh vực kỹ năng), kỹ năng
thực hành tại bàn làm việc, và những bước tiếp theo trong Cơ sở tri thức.

## Những bước đầu tiên

1. Đọc hướng dẫn [Nội quy & An toàn phòng lab](/docs/lab-rules) **trước khi** sử dụng bất kỳ thiết bị nào.
2. Tham gia các tài khoản & kênh của ACLAB (bên dưới).
3. Cài đặt phần mềm cho (các) lĩnh vực kỹ năng của bạn (bên dưới).
4. Thiết lập môi trường dự án — xem danh mục kỹ thuật tương ứng.
5. Gặp người hướng dẫn (mentor) và chọn một nhiệm vụ khởi đầu.

## Tài khoản & kênh

Nhận quyền truy cập và theo dõi các kênh của chúng tôi:

| Kênh | Liên kết |
| --- | --- |
| Tổ chức GitHub | https://github.com/orgs/ACLAB-HCMUT/dashboard |
| YouTube — ChipFC | https://www.youtube.com/@chipfc |
| Nhóm Facebook | https://www.facebook.com/groups/aclabbachkhoa/ |
| Trang Facebook | https://www.facebook.com/aclabhcumt/ |

> Hãy nhờ mentor thêm bạn vào tổ chức GitHub và team/kênh dự án liên quan.

## Cài đặt phần mềm theo lĩnh vực kỹ năng

Chỉ cài những gì công việc của bạn cần — chọn các lĩnh vực liên quan đến dự án của bạn, và xem
hướng dẫn Cơ sở tri thức được liên kết để thiết lập sâu hơn.

### Quản lý phiên bản & cộng tác

| Công cụ | Mục đích | Tải về |
| --- | --- | --- |
| **Git** | Quản lý phiên bản | https://git-scm.com/downloads |
| **GitHub** | Repo, issue, PR, cộng tác | https://github.com/ACLAB-HCMUT |
| **VS Code** | Trình soạn thảo (Git, PlatformIO, tiện ích mở rộng) | https://code.visualstudio.com/ |

→ Xem thêm: [DevOps & Hạ tầng nghiên cứu](/docs/devops).

### Hệ thống nhúng & firmware

| Công cụ | Mục đích | Tải về |
| --- | --- | --- |
| **Arduino IDE** | Lập trình MCU thân thiện cho người mới (gồm cả ESP32) | https://www.arduino.cc/en/software |
| **STM32CubeMX** | Cấu hình pinout/clock/ngoại vi cho STM32 | https://www.st.com/en/development-tools/stm32cubemx.html |
| **STM32CubeIDE** | Build, nạp & debug STM32 (HAL/C) | https://www.st.com/en/development-tools/stm32cubeide.html |
| **PlatformIO** | Hệ thống build đa board (plugin VS Code) | https://platformio.org/ |
| **Proteus** | Mô phỏng mạch & MCU (dùng trong các khóa học của chúng tôi) | Phòng lab cung cấp |

→ Xem thêm: [Firmware nhúng](/docs/embedded-firmware) · các bài lab thực hành trong
[Khóa học → Vi điều khiển](/courses/microcontroller) và [Khóa học → IoT](/courses/iot).

### Thiết kế PCB & điện tử

| Công cụ | Mục đích | Tải về |
| --- | --- | --- |
| **KiCad** | Vẽ sơ đồ mạch & layout PCB (mã nguồn mở) | https://www.kicad.org/download/ |

→ Xem thêm: [Thiết kế PCB & DFM](/docs/pcb-design).

### Cơ khí / CAD

| Công cụ | Mục đích | Tải về |
| --- | --- | --- |
| **Fusion 360** | CAD 3D, vỏ hộp, in 3D & CAM | https://www.autodesk.com/products/fusion-360 |

> Hãy dùng giấy phép **sinh viên/giáo dục** của Autodesk nếu bạn đủ điều kiện.

### Robotics

| Công cụ | Mục đích | Ghi chú |
| --- | --- | --- |
| **ROS 2** | Middleware cho robot (node, topic, điều khiển) | Khuyến nghị dùng Ubuntu |
| **Gazebo** | Mô phỏng robot | Kết hợp với ROS 2 |

→ Xem thêm: [Robotics & ROS](/docs/robotics-ros).

### AI / Edge AI

→ Xem [AI / Edge AI](/docs/ai-edge) để biết về framework, tối ưu hóa mô hình và thiết lập suy luận
trên thiết bị (on-device inference).

## Kỹ năng tại bàn làm việc & công cụ phòng lab

Ngoài phần mềm, công việc trong lab còn cần các kỹ năng thực hành với phần cứng. **Hãy được mentor
huấn luyện và đọc [Nội quy & An toàn phòng lab](/docs/lab-rules) trước khi sử dụng bất kỳ thiết bị nào trong số này.**

| Công cụ | Dùng để |
| --- | --- |
| **Mỏ hàn** | Hàn xuyên lỗ & SMD, sửa chữa (rework) |
| **Trạm khò nhiệt (hot air)** | Linh kiện SMD, reflow & tháo hàn |
| **Máy hiện sóng (oscilloscope)** | Quan sát tín hiệu, định thời, gỡ lỗi |
| **Đồng hồ vạn năng (multimeter)** | Đo điện áp/dòng điện/thông mạch, chẩn đoán cơ bản |
| **Nguồn để bàn (bench power supply)** | Cấp nguồn và giới hạn dòng cho mạch mẫu |
| **Máy phân tích logic (logic analyzer)** | Giải mã bus số (UART, I²C, SPI) |

→ Cách sử dụng từng thiết bị: [Hướng dẫn thiết bị phòng lab](/docs/equipment).

## Danh sách kiểm tra cho thành viên mới

- [ ] Đã tham gia tổ chức GitHub của ACLAB
- [ ] Đã theo dõi các kênh YouTube và Facebook
- [ ] Đã được thêm vào team / kênh dự án liên quan
- [ ] Đã đọc [Nội quy & An toàn phòng lab](/docs/lab-rules)
- [ ] Đã cài đặt phần mềm cho (các) lĩnh vực kỹ năng của bạn
- [ ] Đã được huấn luyện về các công cụ tại bàn mà bạn sẽ dùng
- [ ] Đã gặp mentor và chọn một nhiệm vụ khởi đầu

## Tiếp theo nên đi đâu

- **Hướng dẫn kỹ thuật:** [Firmware nhúng](/docs/embedded-firmware) ·
  [Thiết kế PCB & DFM](/docs/pcb-design) · [Robotics & ROS](/docs/robotics-ros) ·
  [AI / Edge AI](/docs/ai-edge) · [Các chủ đề IoT trong Khóa học](/courses/iot)
- **Công cụ & hạ tầng:** [Hướng dẫn thiết bị phòng lab](/docs/equipment) ·
  [DevOps & Hạ tầng nghiên cứu](/docs/devops)
- **Làm cho đúng:** [Cách lập tài liệu cho một dự án](/docs/project-docs) ·
  [Dự án](/docs/projects/vr-robot-arm-teleoperation)

> Hoan nghênh mọi đóng góp — dùng **Edit this page** để cải thiện tài liệu nhập môn.
