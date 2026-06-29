---
sidebar_position: 3
title: Máy tính bo mạch đơn (SBC / SoC)
---

# Máy tính bo mạch đơn (SBC / SoC)

Máy tính bo mạch đơn là một máy tính hoàn chỉnh trên một bo mạch, được xây dựng quanh một **System-on-Chip (SoC)**
tích hợp CPU đa nhân, GPU, bộ điều khiển RAM và I/O. Nó khởi động một hệ điều hành thực sự
(thường là Linux), nên bạn có hệ thống tệp, kết nối mạng, trình quản lý gói, và khả năng
chạy nhiều chương trình cùng lúc — đánh đổi bằng độ chính xác thời gian thực và khởi động tức thì.

:::info Lưu trữ & hệ điều hành
Hầu hết SBC khởi động từ một **thẻ microSD** (hoặc eMMC/SSD trên các mẫu mới hơn). Hãy dùng thẻ chất lượng,
nạp hệ điều hành bằng trình imager chính thức, và **tắt máy đúng cách (shut down cleanly)** — rút nguồn đột ngột có thể làm hỏng
thẻ.
:::

## Raspberry Pi

SBC phổ biến nhất trong phòng lab. Các thế hệ liên quan:

| Mẫu | SoC / CPU | RAM | Ghi chú |
| --- | --- | --- | --- |
| **Pi 3 (B+)** | Cortex-A53 4 nhân @ 1.4 GHz | 1 GB | Cũ hơn, ổn cho các tác vụ nhẹ/headless |
| **Pi 4** | Cortex-A72 4 nhân @ 1.5 GHz | 1–8 GB | USB 3.0, dual HDMI; cần USB-C 5 V/3 A |
| **Pi 5** | Cortex-A76 4 nhân @ 2.4 GHz | 4 / 8 GB | Nhanh hơn nhiều; cần 5 V/5 A (PD), khuyến nghị tản nhiệt chủ động |

- **Dùng cho:** dịch vụ Linux, kết nối mạng, camera, thị giác nhẹ, các node ROS 2, dashboard.
- **Hệ điều hành:** Raspberry Pi OS (dựa trên Debian) — nạp bằng Raspberry Pi Imager.
- **I/O:** một header GPIO 40 chân (logic 3.3 V) cho cảm biến và HAT.

:::caution Nguồn & nhiệt
Nguồn cấp yếu gây ra cảnh báo hình tia sét trên màn hình và mất ổn định ngẫu nhiên —
**hãy dùng PSU chính thức** cho từng mẫu. Pi 4/5 chạy nóng khi tải; hãy thêm tản nhiệt hoặc quạt,
đặc biệt với thị giác hoặc tính toán kéo dài.
:::

:::danger GPIO là 3.3 V — không chịu được 5 V
Các chân GPIO của Raspberry Pi **không chịu được 5 V**. Đưa 5 V vào một chân GPIO có thể
làm hỏng vĩnh viễn SoC. Hãy dịch mức (level-shift) mọi tín hiệu 5 V trước khi kết nối.
:::

## NVIDIA Jetson (edge AI)

Các SoC với **GPU tích hợp hỗ trợ CUDA** để chạy mô hình ML/thị giác ngay trên thiết bị (ví dụ Jetson
Nano / Orin Nano).

- **Dùng cho:** thị giác máy tính thời gian thực, suy luận trên thiết bị, edge AI — xem [AI / Edge AI](/docs/ai-edge).
- **Phần mềm:** NVIDIA JetPack (Ubuntu + CUDA/cuDNN/TensorRT).
- **Lưu ý:** tiêu thụ điện cao hơn Pi; hãy dự trù nguồn barrel/USB-C phù hợp và giải pháp tản nhiệt.

## Pi vs. Jetson

| Nhu cầu | Hãy chọn |
| --- | --- |
| Linux tổng quát, kết nối mạng, ROS 2, thị giác nhẹ | **Raspberry Pi** |
| Học sâu tăng tốc GPU / thị giác nặng | **Jetson** |

:::tip Thiết lập headless
Với robot và máy chủ, bạn hiếm khi cần màn hình. Hãy bật SSH (và Wi-Fi) trong phần cài đặt nâng cao
của trình imager, rồi kết nối qua mạng — không cần bàn phím/HDMI.
:::
