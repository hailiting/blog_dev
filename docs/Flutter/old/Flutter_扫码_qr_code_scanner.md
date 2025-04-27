# Flutter 扫码

```dart
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:pp_wallet_token/common/ft_theme.dart';
import 'package:pp_wallet_token/widget/ft_app_bar_widget.dart';
import 'package:pp_wallet_token/widget/ft_show_toast_utils.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:image/image.dart' as img;
import 'package:zxing2/qrcode.dart' as qrcode;

class ScanPage extends StatefulWidget {
  ScanPage({Key? key}) : super(key: key);
  @override
  State<StatefulWidget> createState() => _ScanPageState();
}

class _ScanPageState extends State<ScanPage> with TickerProviderStateMixin {
  IconData lightIcon = Icons.flash_on;
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  QRViewController? controller;
  // 动画
  late AnimationController _animationController;
  late Animation<EdgeInsets> _animationSize;

  // @override
  // void initState() {
  //   super.initState();
  //   if (mounted) {

  //   }
  // }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _initAnimation();
  }

  @override
  void dispose() {
    FTTheme.setDefaultTheme();
    controller?.dispose();
    _animationController.dispose();
    super.dispose();
  }

  @override
  void reassemble() {
    super.reassemble();
    if (Platform.isAndroid) {
      controller?.pauseCamera();
    }
    controller?.resumeCamera();
  }

  void getResult(String data, BuildContext context) {
    /// 获取结果后返回给外部界面使用
    Navigator.pop(Get.context!, data);
  }

  void resumeCamera() {
    if (Platform.isAndroid) {
      controller?.pauseCamera();
    }
    controller?.resumeCamera();
  }

  void _onQRViewCreated(QRViewController controller) {
    if (Platform.isAndroid) {
      controller.pauseCamera();
      controller.resumeCamera();
    }
    setState(() {
      this.controller = controller;
    });
    resumeCamera();
    controller.scannedDataStream.listen((scanData) {
      if (scanData.code != null && scanData.format == BarcodeFormat.qrcode) {
        /// 避免扫描结果多次回调
        controller.dispose();
        getResult("${scanData.code ?? ""}", Get.context!);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    var scanArea = (MediaQuery.of(context).size.width < 400 ||
            MediaQuery.of(context).size.height < 400)
        ? 250.0
        : 300.0;
    return Scaffold(
      appBar: FTAppBarWidget(
        backgroundColor: Colours.dialogColor09,
        leadingColor: Colours.themeColor00,
        title: "pt_scan_title".tr,
        textStyle: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w700,
            color: Colours.themeColor00),
        actions: [
          InkWell(
            onTap: () async {
              // bool pRet = await PermissionsUtil.getPhotosPermission();
              //  if (pRet) {
              pickAsset();
              // } else {
              //   FTShowToastUtils.showToast('pt_scan_photo_permissions'.tr);
              //   return;
              // }
            },
            child: Center(
              child: Padding(
                padding: EdgeInsets.only(
                  right: ScreenWH.rsw(32),
                ),
                child: Text(
                  'pt_scan_photo_album'.tr,
                  style: TextStyle(color: Colours.themeColor00, fontSize: 16),
                ),
              ),
            ),
          ),
        ],
        brightness: Brightness.light,
      ),
      body: Stack(alignment: AlignmentDirectional.topCenter, children: [
        Stack(
          alignment: Alignment.center,
          children: [
            QRView(
              key: qrKey,
              onQRViewCreated: _onQRViewCreated,
              overlay: QrScannerOverlayShape(
                borderColor: Colors.green,
                borderLength: 40,
                borderWidth: ScreenWH.rsw(8),
                cutOutSize: scanArea,
              ),
              onPermissionSet: (ctrl, p) => _onPermissionSet(context, ctrl, p),
            ),
            _animatedBuilder(),
          ],
        ),
        Positioned(
          bottom: 150,
          child: Column(
            children: [
              SizedBox(
                height: 8,
              ),
              Text(
                'pt_scan_qr'.tr,
                textAlign: TextAlign.left,
                style: TextStyle(
                  color: Colours.themeColor00,
                  fontSize: ScreenWH.rsSp(28),
                ),
              ),
              SizedBox(
                height: 8,
              ),
              Text(
                'pt_scan_qr_subtitle'.tr,
                textAlign: TextAlign.left,
                style: TextStyle(
                  color: Colours.themeColor00,
                  fontSize: ScreenWH.rsSp(28),
                ),
              ),
            ],
          ),
        ),
        Positioned(
          bottom: 10,
          child: StatefulBuilder(
            builder: (BuildContext context, StateSetter setState) {
              return MaterialButton(
                  child: Column(
                    children: [
                      Icon(
                        lightIcon,
                        size: ScreenWH.rsw(80),
                        color: Colours.themeColor00,
                      ),
                      SizedBox(
                        height: 8,
                      ),
                      Text(
                        'pt_scan_light'.tr,
                        textAlign: TextAlign.left,
                        style: TextStyle(
                          color: Colours.themeColor00,
                          fontSize: ScreenWH.rsSp(24),
                        ),
                      ),
                    ],
                  ),
                  onPressed: () async {
                    await controller?.toggleFlash();
                    if (lightIcon == Icons.flash_on) {
                      lightIcon = Icons.flash_off;
                    } else {
                      lightIcon = Icons.flash_on;
                    }
                    setState(() {});
                  });
            },
          ),
        ),
      ]),
    );
  }

  void _onPermissionSet(BuildContext context, QRViewController ctrl, bool p) {
    if (!p) {
      FTShowToastUtils.showToast('No permission');
      Navigator.of(context).pop();
    }
  }

  void pickAsset() async {
    final ImagePicker _picker = ImagePicker();
    final XFile? file =
        await _picker.pickImage(source: ImageSource.gallery, imageQuality: 100);

    /// 用户未选择图片就返回的情况
    if (file == null) {
      return;
    }
    try {
      controller?.pauseCamera();
      var image =
          img.decodeNamedImage(file.path, File(file.path).readAsBytesSync())!;
      qrcode.LuminanceSource source = qrcode.RGBLuminanceSource(
          image.width,
          image.height,
          image
              .convert(numChannels: 4)
              .getBytes(order: img.ChannelOrder.abgr)
              .buffer
              .asInt32List());
      var bitmap = qrcode.BinaryBitmap(qrcode.HybridBinarizer(source));

      var reader = qrcode.QRCodeReader();
      var result = reader.decode(bitmap);
      getResult(result.text, Get.context!);
    } catch (e) {
      FTShowToastUtils.showToast('pt_scan_photo_error'.tr);
    }
  }

  _initAnimation() {
    final scanArea = (MediaQuery.of(context).size.width < 400 ||
            MediaQuery.of(context).size.height < 400)
        ? 250.0
        : 300.0;

    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    );

    _animationSize = Tween<EdgeInsets>(
      begin: EdgeInsets.only(bottom: scanArea * 0.8),
      end: EdgeInsets.only(top: scanArea * 0.8),
    ).animate(
      // 设置Curve值 动画的执行速率
      CurvedAnimation(
          parent: _animationController, curve: const Interval(0.0, 1.0)),
    );

    /// 监听动画状态的改变
    /// dismissed：回到动画起点处
    /// forward：从起点往终点方向执行
    /// reverse：从终点往起点反方向执行
    /// completed：到达动画终点处
    _animationController.addStatusListener((status) {
      // 到终点再从起点开始
      if (status == AnimationStatus.completed) {
        _animationController.forward(from: 0.0);
      }

      // 到终点折返回起点
      // if (status == AnimationStatus.completed) {
      //   // 执行结束反向执行
      //   _animationController.reverse();
      // } else if (status == AnimationStatus.dismissed) {
      //   // 反向执行结束正向执行
      //   _animationController.forward();
      // }
    });

    _animationController.forward();
  }

  opacity(double value) {
    if (value < 60) {
      double float = (value / 60);
      if (float > 1) {
        return 1;
      }
      if (float < 0) {
        return 0;
      }
      return float;
    }
    return 1.0;
  }

  _animatedBuilder() {
    var scanArea = (MediaQuery.of(context).size.width < 400 ||
            MediaQuery.of(context).size.height < 400)
        ? 250.0
        : 300.0;
    return AnimatedBuilder(
      animation: _animationController,
      builder: (BuildContext context, Widget? child) {
        return Opacity(
          opacity: opacity(_animationSize.value.bottom),
          child: Container(
            margin: _animationSize.value,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  width: scanArea * 0.8,
                  height: ScreenWH.rsw(4),
                  color: Colors.green,
                )
              ],
            ),
          ),
        );
      },
    );
  }
}

```
