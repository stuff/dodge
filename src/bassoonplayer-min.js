/*BassoonTracker v0.3.6 by Steffest - build 2019-04-06 - Full source on https://github.com/steffest/BassoonTracker */ var BassoonTracker = (function () {
  function a(a, b) {
    var c = new XMLHttpRequest();
    c.open('GET', a, !0),
      (c.responseType = 'arraybuffer'),
      (c.onload = function (a) {
        var d = c.response;
        d ? b && b(d) : b && b(!1);
      }),
      c.send(null);
  }
  function b(a, b) {
    function c(a) {
      (a = 0 === a ? a : a || d.index),
        a < 0 && (a = 0),
        a >= d.length && (a = d.length - 1),
        (d.index = a);
    }
    var d = { index: 0, litteEndian: !b };
    return (
      (d.goto = function (a) {
        c(a);
      }),
      (d.jump = function (a) {
        this.goto(this.index + a);
      }),
      (d.readByte = function (a) {
        c(a);
        var b = this.dataView.getInt8(this.index);
        return this.index++, b;
      }),
      (d.writeByte = function (a, b) {
        c(b), this.dataView.setInt8(this.index, a), this.index++;
      }),
      (d.readUbyte = function (a) {
        c(a);
        var b = this.dataView.getUint8(this.index);
        return this.index++, b;
      }),
      (d.writeUByte = function (a, b) {
        c(b), this.dataView.setUint8(this.index, a), this.index++;
      }),
      (d.readUint = function (a) {
        c(a);
        var b = this.dataView.getUint32(this.index, this.litteEndian);
        return (this.index += 4), b;
      }),
      (d.writeUint = function (a, b) {
        c(b), this.dataView.setUint32(this.index, a, this.litteEndian), (this.index += 4);
      }),
      (d.readBytes = function (a, b) {
        c(b);
        var d = new Uint8Array(a),
          e = this.index;
        (a += e) > this.length && (a = this.length);
        for (var f = 0; e < a; ++e) d.setUint8(f++, this.dataView.getUint8(e));
        return (this.index = a), d;
      }),
      (d.readString = function (a, b) {
        c(b);
        var d = this.index,
          e = this.dataView,
          f = '';
        for ((a += d) > this.length && (a = this.length); d < a; ++d) {
          var g = e.getUint8(d);
          if (0 == g) break;
          f += String.fromCharCode(g);
        }
        return (this.index = a), f;
      }),
      (d.writeString = function (a, b) {
        c(b);
        for (var d = this.dataView, e = a.length, f = 0; f < e; f++)
          d.setUint8(this.index + f, a.charCodeAt(f));
        this.index += e;
      }),
      (d.writeStringSection = function (a, b, e, f) {
        c(f), (b = b || 1), (a = a || ''), (e = e || 0);
        var g = a.length;
        g > b && (a = a.substr(0, b)), d.writeString(a), d.fill(e, b - g);
      }),
      (d.readWord = function (a) {
        c(a);
        var b = this.dataView.getUint16(this.index, this.litteEndian);
        return (this.index += 2), b;
      }),
      (d.writeWord = function (a, b) {
        c(b), this.dataView.setUint16(this.index, a, this.litteEndian), (this.index += 2);
      }),
      (d.readLong = d.readDWord = d.readUint),
      (d.writeLong = d.writeDWord = d.writeUint),
      (d.readShort = function (a, b) {
        c(b);
        var d = this.dataView.getInt16(this.index, this.litteEndian);
        return (this.index += 2), d;
      }),
      (d.clear = function (a) {
        d.fill(0, a);
      }),
      (d.fill = function (a, b) {
        (a = a || 0), (b = b || 0);
        for (var c = 0; c < b; c++) d.writeByte(a);
      }),
      (d.isEOF = function (a) {
        return (a = a || 0), this.index >= this.length - a;
      }),
      (d.buffer = a),
      (d.dataView = new DataView(a)),
      (d.length = a.byteLength),
      d
    );
  }
  function c(a) {
    if (window.location.getParameter) return window.location.getParameter(a);
    if (location.search)
      for (var b = location.search.substring(1).split('&'), c = 0; c < b.length; c++) {
        var d = b[c].split('=');
        if (d[0] && d[0] == a) return d[1] || !0;
      }
  }
  var d = (function () {
      var a,
        b = {},
        c = 'object' == typeof Application && Application.initFriendVR;
      return (
        (b.useUrlParams = !c),
        (b.getBaseUrl = function () {
          return c
            ? Application.progDir
            : 'undefined' == typeof Settings
            ? ''
            : Settings.baseUrl || '';
        }),
        (b.setMessageHandler = function (b) {
          a = b;
        }),
        (b.putFile = function (a, b) {}),
        (b.sendMessage = function (b) {
          a &&
            ('string' == typeof b && (b = { command: b }),
            (b = b || {}),
            (b.type = 'callback'),
            a(b));
        }),
        b
      );
    })(),
    e = { images: {}, audio: {}, json: {}, arrayBuffer: {} },
    f = void 0,
    g = { image: 1, audio: 2, json: 3, binary: 4 },
    h = {
      instrumentChange: 1,
      patternChange: 2,
      patternPosChange: 3,
      patternTableChange: 4,
      recordingChange: 5,
      cursorPositionChange: 6,
      trackStateChange: 7,
      playingChange: 8,
      playTypeChange: 9,
      songPositionChange: 10,
      songSpeedChange: 11,
      songBPMChange: 12,
      samplePlay: 13,
      screenRefresh: 14,
      screenRender: 15,
      songPropertyChange: 16,
      instrumentNameChange: 17,
      command: 18,
      pianoNoteOn: 19,
      pianoNoteOff: 20,
      statusChange: 21,
      diskOperationTargetChange: 22,
      diskOperationActionChange: 23,
      trackCountChange: 24,
      patternHorizontalScrollChange: 25,
      songLoaded: 26,
      songLoading: 27,
      trackerModeChanged: 28,
      instrumentListChange: 29,
      showView: 30,
      toggleView: 31,
      visibleTracksCountChange: 32,
      filterChainCountChange: 33,
      fxPanelToggle: 34,
      samplePropertyChange: 35,
      sampleIndexChange: 36,
      second: 37,
      minute: 38,
      dropboxConnect: 39,
      dropboxConnectCancel: 40,
      trackScopeClick: 41,
      octaveChanged: 42,
      skipFrameChanged: 43,
      showContextMenu: 44,
      hideContextMenu: 45,
      clockEventExpired: 46,
      commandUndo: 50,
      commandRedo: 51,
      commandSelectAll: 52,
    },
    i = { song: 1, pattern: 2 },
    k = { FULL: 1, BALANCED: 2, NONE: 3 },
    l = { NONE: 0, FORWARD: 1, PINGPONG: 2 },
    m = 7093790,
    n = 7158728,
    o = m / 2,
    p = n / 2,
    q = {
      C1: {
        period: 856,
        name: 'C-1',
        tune: [907, 900, 894, 887, 881, 875, 868, 862, 856, 850, 844, 838, 832, 826, 820, 814],
      },
      Cs1: {
        period: 808,
        name: 'C#1',
        tune: [856, 850, 844, 838, 832, 826, 820, 814, 808, 802, 796, 791, 785, 779, 774, 768],
      },
      D1: {
        period: 762,
        name: 'D-1',
        tune: [808, 802, 796, 791, 785, 779, 774, 768, 762, 757, 752, 746, 741, 736, 730, 725],
      },
      Ds1: {
        period: 720,
        name: 'D#1',
        tune: [762, 757, 752, 746, 741, 736, 730, 725, 720, 715, 709, 704, 699, 694, 689, 684],
      },
      E1: {
        period: 678,
        name: 'E-1',
        tune: [720, 715, 709, 704, 699, 694, 689, 684, 678, 674, 670, 665, 660, 655, 651, 646],
      },
      F1: {
        period: 640,
        name: 'F-1',
        tune: [678, 675, 670, 665, 660, 655, 651, 646, 640, 637, 632, 628, 623, 619, 614, 610],
      },
      Fs1: {
        period: 604,
        name: 'F#1',
        tune: [640, 636, 632, 628, 623, 619, 614, 610, 604, 601, 597, 592, 588, 584, 580, 575],
      },
      G1: {
        period: 570,
        name: 'G-1',
        tune: [604, 601, 597, 592, 588, 584, 580, 575, 570, 567, 563, 559, 555, 551, 547, 543],
      },
      Gs1: {
        period: 538,
        name: 'G#1',
        tune: [570, 567, 563, 559, 555, 551, 547, 543, 538, 535, 532, 528, 524, 520, 516, 513],
      },
      A1: {
        period: 508,
        name: 'A-1',
        tune: [538, 535, 532, 528, 524, 520, 516, 513, 508, 505, 502, 498, 495, 491, 487, 484],
      },
      As1: {
        period: 480,
        name: 'A#1',
        tune: [508, 505, 502, 498, 494, 491, 487, 484, 480, 477, 474, 470, 467, 463, 460, 457],
      },
      B1: {
        period: 453,
        name: 'B-1',
        tune: [480, 477, 474, 470, 467, 463, 460, 457, 453, 450, 447, 444, 441, 437, 434, 431],
      },
      C2: {
        period: 428,
        name: 'C-2',
        tune: [453, 450, 447, 444, 441, 437, 434, 431, 428, 425, 422, 419, 416, 413, 410, 407],
      },
      Cs2: {
        period: 404,
        name: 'C#2',
        tune: [428, 425, 422, 419, 416, 413, 410, 407, 404, 401, 398, 395, 392, 390, 387, 384],
      },
      D2: {
        period: 381,
        name: 'D-2',
        tune: [404, 401, 398, 395, 392, 390, 387, 384, 381, 379, 376, 373, 370, 368, 365, 363],
      },
      Ds2: {
        period: 360,
        name: 'D#2',
        tune: [381, 379, 376, 373, 370, 368, 365, 363, 360, 357, 355, 352, 350, 347, 345, 342],
      },
      E2: {
        period: 339,
        name: 'E-2',
        tune: [360, 357, 355, 352, 350, 347, 345, 342, 339, 337, 335, 332, 330, 328, 325, 323],
      },
      F2: {
        period: 320,
        name: 'F-2',
        tune: [339, 337, 335, 332, 330, 328, 325, 323, 320, 318, 316, 314, 312, 309, 307, 305],
      },
      Fs2: {
        period: 302,
        name: 'F#2',
        tune: [320, 318, 316, 314, 312, 309, 307, 305, 302, 300, 298, 296, 294, 292, 290, 288],
      },
      G2: {
        period: 285,
        name: 'G-2',
        tune: [302, 300, 298, 296, 294, 292, 290, 288, 285, 284, 282, 280, 278, 276, 274, 272],
      },
      Gs2: {
        period: 269,
        name: 'G#2',
        tune: [285, 284, 282, 280, 278, 276, 274, 272, 269, 268, 266, 264, 262, 260, 258, 256],
      },
      A2: {
        period: 254,
        name: 'A-2',
        tune: [269, 268, 266, 264, 262, 260, 258, 256, 254, 253, 251, 249, 247, 245, 244, 242],
      },
      As2: {
        period: 240,
        name: 'A#2',
        tune: [254, 253, 251, 249, 247, 245, 244, 242, 240, 239, 237, 235, 233, 232, 230, 228],
      },
      B2: {
        period: 226,
        name: 'B-2',
        tune: [240, 238, 237, 235, 233, 232, 230, 228, 226, 225, 224, 222, 220, 219, 217, 216],
      },
      C3: {
        period: 214,
        name: 'C-3',
        tune: [226, 225, 223, 222, 220, 219, 217, 216, 214, 213, 211, 209, 208, 206, 205, 204],
      },
      Cs3: {
        period: 202,
        name: 'C#3',
        tune: [214, 212, 211, 209, 208, 206, 205, 203, 202, 201, 199, 198, 196, 195, 193, 192],
      },
      D3: {
        period: 190,
        name: 'D-3',
        tune: [202, 200, 199, 198, 196, 195, 193, 192, 190, 189, 188, 187, 185, 184, 183, 181],
      },
      Ds3: {
        period: 180,
        name: 'D#3',
        tune: [190, 189, 188, 187, 185, 184, 183, 181, 180, 179, 177, 176, 175, 174, 172, 171],
      },
      E3: {
        period: 170,
        name: 'E-3',
        tune: [180, 179, 177, 176, 175, 174, 172, 171, 170, 169, 167, 166, 165, 164, 163, 161],
      },
      F3: {
        period: 160,
        name: 'F-3',
        tune: [170, 169, 167, 166, 165, 164, 163, 161, 160, 159, 158, 157, 156, 155, 154, 152],
      },
      Fs3: {
        period: 151,
        name: 'F#3',
        tune: [160, 159, 158, 157, 156, 155, 154, 152, 151, 150, 149, 148, 147, 146, 145, 144],
      },
      G3: {
        period: 143,
        name: 'G-3',
        tune: [151, 150, 149, 148, 147, 146, 145, 144, 143, 142, 141, 140, 139, 138, 137, 136],
      },
      Gs3: {
        period: 135,
        name: 'G#3',
        tune: [143, 142, 141, 140, 139, 138, 137, 136, 135, 134, 133, 132, 131, 130, 129, 128],
      },
      A3: {
        period: 127,
        name: 'A-3',
        tune: [135, 134, 133, 132, 131, 130, 129, 128, 127, 126, 125, 125, 124, 123, 122, 121],
      },
      As3: {
        period: 120,
        name: 'A#3',
        tune: [127, 126, 125, 125, 123, 123, 122, 121, 120, 119, 118, 118, 117, 116, 115, 114],
      },
      B3: {
        period: 113,
        name: 'B-3',
        tune: [120, 119, 118, 118, 117, 116, 115, 114, 113, 113, 112, 111, 110, 109, 109, 108],
      },
    },
    r = {
      None: { name: '---' },
      C0: { name: 'C-0', period: 6848 },
      Cs0: { name: 'C#0', period: 6464 },
      D0: { name: 'D-0', period: 6096 },
      Ds0: { name: 'D#0', period: 5760 },
      E0: { name: 'E-0', period: 5424 },
      F0: { name: 'F-0', period: 5120 },
      Fs0: { name: 'F#0', period: 4832 },
      G0: { name: 'G-0', period: 4560 },
      Gs0: { name: 'G#0', period: 4304 },
      A0: { name: 'A-0', period: 4064 },
      As0: { name: 'A#0', period: 3840 },
      B0: { name: 'B-0', period: 3624 },
      C1: { name: 'C-1', period: 3424 },
      Cs1: { name: 'C#1', period: 3232 },
      D1: { name: 'D-1', period: 3048 },
      Ds1: { name: 'D#1', period: 2880 },
      E1: { name: 'E-1', period: 2712 },
      F1: { name: 'F-1', period: 2560 },
      Fs1: { name: 'F#1', period: 2416 },
      G1: { name: 'G-1', period: 2280 },
      Gs1: { name: 'G#1', period: 2152 },
      A1: { name: 'A-1', period: 2032 },
      As1: { name: 'A#1', period: 1920 },
      B1: { name: 'B-1', period: 1812 },
      C2: { name: 'C-2', period: 1712 },
      Cs2: { name: 'C#2', period: 1616 },
      D2: { name: 'D-2', period: 1524 },
      Ds2: { name: 'D#2', period: 1440 },
      E2: { name: 'E-2', period: 1356 },
      F2: { name: 'F-2', period: 1280 },
      Fs2: { name: 'F#2', period: 1208 },
      G2: { name: 'G-2', period: 1140 },
      Gs2: { name: 'G#2', period: 1076 },
      A2: { name: 'A-2', period: 1016 },
      As2: { name: 'A#2', period: 960 },
      B2: { name: 'B-2', period: 906 },
      C3: { name: 'C-3', period: 856 },
      Cs3: { name: 'C#3', period: 808 },
      D3: { name: 'D-3', period: 762 },
      Ds3: { name: 'D#3', period: 720 },
      E3: { name: 'E-3', period: 678 },
      F3: { name: 'F-3', period: 640 },
      Fs3: { name: 'F#3', period: 604 },
      G3: { name: 'G-3', period: 570 },
      Gs3: { name: 'G#3', period: 538 },
      A3: { name: 'A-3', period: 508 },
      As3: { name: 'A#3', period: 480 },
      B3: { name: 'B-3', period: 453 },
      C4: { name: 'C-4', period: 428 },
      Cs4: { name: 'C#4', period: 404 },
      D4: { name: 'D-4', period: 381 },
      Ds4: { name: 'D#4', period: 360 },
      E4: { name: 'E-4', period: 339 },
      F4: { name: 'F-4', period: 320 },
      Fs4: { name: 'F#4', period: 302 },
      G4: { name: 'G-4', period: 285 },
      Gs4: { name: 'G#4', period: 269 },
      A4: { name: 'A-4', period: 254 },
      As4: { name: 'A#4', period: 240 },
      B4: { name: 'B-4', period: 226.5, modPeriod: 226 },
      C5: { name: 'C-5', period: 214 },
      Cs5: { name: 'C#5', period: 202 },
      D5: { name: 'D-5', period: 190.5, modPeriod: 190 },
      Ds5: { name: 'D#5', period: 180 },
      E5: { name: 'E-5', period: 169.5, modPeriod: 170 },
      F5: { name: 'F-5', period: 160 },
      Fs5: { name: 'F#5', period: 151 },
      G5: { name: 'G-5', period: 142.5, modPeriod: 143 },
      Gs5: { name: 'G#5', period: 134.5, modPeriod: 135 },
      A5: { name: 'A-5', period: 127 },
      As5: { name: 'A#5', period: 120 },
      B5: { name: 'B-5', period: 113.25, modPeriod: 113 },
      C6: { name: 'C-6', period: 107 },
      Cs6: { name: 'C#6', period: 101 },
      D6: { name: 'D-6', period: 95.25, modPeriod: 95 },
      Ds6: { name: 'D#6', period: 90 },
      E6: { name: 'E-6', period: 84.75, modPeriod: 85 },
      F6: { name: 'F-6', period: 80 },
      Fs6: { name: 'F#6', period: 75.5, modPeriod: 75 },
      G6: { name: 'G-6', period: 71.25, modPeriod: 71 },
      Gs6: { name: 'G#6', period: 67.25, modPeriod: 67 },
      A6: { name: 'A-6', period: 63.5, modPeriod: 63 },
      As6: { name: 'A#6', period: 60 },
      B6: { name: 'B-6', period: 56.625, modPeriod: 56 },
      C7: { name: 'C-7', period: 53.5, modPeriod: 53 },
      Cs7: { name: 'C#7', period: 50.5, modPeriod: 50 },
      D7: { name: 'D-7', period: 47.625, modPeriod: 47 },
      Ds7: { name: 'D#7', period: 45 },
      E7: { name: 'E-7', period: 42.375, modPeriod: 42 },
      F7: { name: 'F-7', period: 40 },
      Fs7: { name: 'F#7', period: 37.75, modPeriod: 37 },
      G7: { name: 'G-7', period: 35.625, modPeriod: 35 },
      Gs7: { name: 'G#7', period: 33.625, modPeriod: 33 },
      A7: { name: 'A-7', period: 31.75, modPeriod: 31 },
      As7: { name: 'A#7', period: 30 },
      B7: { name: 'B-7', period: 28.3125, modPeriod: 28 },
      C8: { name: 'C-8', period: 26.75 },
      Cs8: { name: 'C#8', period: 25.25 },
      D8: { name: 'D-8', period: 23.8125 },
      Ds8: { name: 'D#8', period: 22.5 },
      E8: { name: 'E-8', period: 21.1875 },
      F8: { name: 'F-8', period: 20 },
      Fs8: { name: 'F#8', period: 18.875 },
      G8: { name: 'G-8', period: 17.8125 },
      Gs8: { name: 'G#8', period: 16.8125 },
      A8: { name: 'A-8', period: 15.875 },
      As8: { name: 'A#8', period: 15 },
      B8: { name: 'B-8', period: 14.15625 },
      C9: { name: 'C-9', period: 13.375 },
      Cs9: { name: 'C#9', period: 12.625 },
      D9: { name: 'D-9', period: 11.90625 },
      Ds9: { name: 'D#9', period: 11.25 },
      E9: { name: 'E-9', period: 10.59375 },
      F9: { name: 'F-9', period: 10 },
      Fs9: { name: 'F#9', period: 9.4375 },
      G9: { name: 'G-9', period: 8.90625 },
      Gs9: { name: 'G#9', period: 8.40625 },
      A9: { name: 'A-9', period: 7.9375 },
      As9: { name: 'A#9', period: 7.5 },
      B9: { name: 'B-9', period: 7.078125 },
      C10: { name: 'C-10', period: 6.6875 },
      Cs10: { name: 'C#10', period: 6.3125 },
      D10: { name: 'D-10', period: 5.953125 },
      Ds10: { name: 'D#10', period: 5.625 },
      E10: { name: 'E-10', period: 5.296875 },
      F10: { name: 'F-10', period: 5 },
      Fs10: { name: 'F#10', period: 4.71875 },
      G10: { name: 'G-10', period: 4.453125 },
      Gs10: { name: 'G#10', period: 4.203125 },
      A10: { name: 'A-10', period: 3.96875 },
      As10: { name: 'A#10', period: 3.75 },
      B10: { name: 'B-10', period: 3.5390625 },
      C11: { name: 'C-11', period: 3.34375 },
      Cs11: { name: 'C#11', period: 3.15625 },
      D11: { name: 'D-11', period: 2.9765625 },
      Ds11: { name: 'D#11', period: 2.8125 },
      E11: { name: 'E-11', period: 2.6484375 },
      F11: { name: 'F-11', period: 2.5 },
      Fs11: { name: 'F#11', period: 2.359375 },
      G11: { name: 'G-11', period: 2.2265625 },
      Gs11: { name: 'G#11', period: 2.1015625 },
      A11: { name: 'A-11', period: 1.984375 },
      As11: { name: 'A#11', period: 1.875 },
      B11: { name: 'B-11', period: 1.76953125 },
      OFF: { name: 'OFF', period: 0 },
    },
    s = 145,
    t = { PROTRACKER: 1, FASTTRACKER: 2 },
    u = {
      unrollLoops: !1,
      unrollShortLoops: !1,
      sustainKeyboardNotes: !1,
      useHover: !0,
      keyboardTable: 'qwerty',
      vubars: !0,
      stereoSeparation: k.BALANCED,
      emulateProtracker1OffsetBug: !0,
    },
    v = (function () {
      var a = {},
        b = {};
      return (
        (b.on = function (b, c) {
          var d = a[b];
          d || ((d = []), (a[b] = d)), d.push(c);
        }),
        (b.trigger = function (b, c) {
          var d = a[b];
          if (d) {
            var e,
              f = d.length;
            for (e = 0; e < f; e++) d[e](c, b);
          }
        }),
        b
      );
    })(),
    w = (function () {
      function a(a) {
        (e = a.createGain()),
          e.gain.setValueAtTime(1, 0),
          e.connect(a.destination),
          (d = a.createGain()),
          d.connect(e),
          b.setMasterVolume(1),
          (f = a.createBiquadFilter()),
          (f.type = 'lowpass'),
          f.frequency.setValueAtTime(2e4, 0),
          f.connect(d),
          (b.masterVolume = d),
          (b.cutOffVolume = e),
          (b.lowPassfilter = f);
      }
      var b = {};
      (window.AudioContext = window.AudioContext || window.webkitAudioContext),
        (window.OfflineAudioContext =
          window.OfflineAudioContext || window.webkitOfflineAudioContext);
      var c,
        d,
        e,
        f,
        g,
        i,
        j,
        l,
        m,
        n,
        r = [],
        t = [],
        C = k.BALANCED,
        E = 0,
        F = [[], [], []],
        G = 0,
        H = 4143.569,
        I = {
          volume: !0,
          panning: !0,
          high: !0,
          mid: !0,
          low: !0,
          lowPass: !0,
          reverb: !0,
          distortion: !1,
        },
        J = !1;
      return (
        AudioContext && (c = new AudioContext()),
        (b.init = function (d) {
          function e() {
            var a = FilterChain(I);
            a.output().connect(f), r.push(a);
          }
          if ((d = d || c)) {
            (m = !!w.context.createStereoPanner), (n = 'undefined' != typeof Editor), a(d);
            var i = D.getTrackCount();
            for (r = [], g = 0; g < i; g++) e();
            (b.filterChains = r),
              (b.usePanning = m),
              J ||
                (v.on(h.trackStateChange, function (a) {
                  'undefined' != typeof a.track &&
                    r[a.track] &&
                    r[a.track].volumeValue(a.mute ? 0 : 70);
                }),
                v.on(h.trackCountChange, function (a) {
                  for (g = r.length; g < a; g++) e();
                  v.trigger(h.filterChainCountChange, a), b.setStereoSeparation(C);
                }),
                v.on(h.trackerModeChanged, function (a) {
                  b.setStereoSeparation();
                }));
          }
        }),
        (b.enable = function () {
          e.gain.setValueAtTime(1, 0), (b.cutOff = !1);
        }),
        (b.disable = function () {
          e.gain.setValueAtTime(0, 0), (b.cutOff = !0);
          var a = 0;
          F.forEach(function (b, c) {
            (a += b.length),
              b.forEach(function (a) {
                a.gain.cancelScheduledValues(0), a.gain.setValueAtTime(0, 0);
              }),
              (F[c] = []);
          });
        }),
        (b.checkState = function () {
          c && 'suspended' === c.state && c.resume && c.resume();
        }),
        (b.playSample = function (a, d, e, f, i, j, k) {
          var o;
          J ? (o = l) : ((o = c), b.enable()),
            (d = d || 428),
            'undefined' == typeof f && (f = n ? Editor.getCurrentTrack() : 0),
            (j = j || c.currentTime),
            k === s && (e = 0);
          var p,
            q,
            t,
            x = D.getInstrument(a),
            y = d,
            z = 0;
          if (x) {
            var A,
              B = 0,
              C = 0;
            (e = 'undefined' == typeof e ? (100 * x.sample.volume) / 64 : e),
              (z = (x.sample.panning || 0) / 128);
            var E;
            D.inFTMode()
              ? D.useLinearFrequency
                ? (d -= x.getFineTune() / 2)
                : x.getFineTune() && (d = b.getFineTuneForNote(k, x.getFineTune()))
              : x.getFineTune() && (d = b.getFineTuneForPeriod(d, x.getFineTune())),
              (E = b.getSampleRateForPeriod(d));
            var I = 1;
            x.sample.data.length
              ? ((C = x.sample.data.length),
                i &&
                  i.offset &&
                  (i.offset.value >= C && (i.offset.value = C - 1),
                  (B = i.offset.value / o.sampleRate)),
                (A = o.createBuffer(1, C, o.sampleRate)),
                (I = E / o.sampleRate))
              : ((A = o.createBuffer(1, 1, o.sampleRate)), (B = 0));
            var K = A.getChannelData(0);
            for (g = 0; g < C; g++) K[g] = x.sample.data[g];
            H = E;
            var L = o.createBufferSource();
            L.buffer = A;
            var M = o.createGain();
            if (
              ((M.gain.value = e / 100),
              M.gain.setValueAtTime(e / 100, j),
              x.sample.loop.enabled &&
                x.sample.loop.length > 2 &&
                (u.unrollLoops ||
                  ((L.loop = !0),
                  (L.loopStart = x.sample.loop.start / o.sampleRate),
                  (L.loopEnd = (x.sample.loop.start + x.sample.loop.length) / o.sampleRate))),
              x.volumeEnvelope.enabled || x.panningEnvelope.enabled || x.hasVibrato())
            ) {
              var N = x.noteOn(j),
                O = L;
              N.volume && ((p = N.volume), L.connect(p), (O = p)),
                N.panning && ((q = N.panning), O.connect(q), (O = q)),
                (t = N.scheduled),
                O.connect(M);
            } else L.connect(M);
            var P = w.context.createGain();
            if (
              (P.gain.setValueAtTime(0, j),
              P.gain.linearRampToValueAtTime(1, j + 0.01),
              M.connect(P),
              m)
            ) {
              var Q = w.context.createStereoPanner();
              Q.pan.setValueAtTime(z, j), P.connect(Q), Q.connect(r[f].input());
            } else P.connect(r[f].input());
            L.playbackRate.value = I;
            var R = 0,
              S = j + R;
            L.start(S, B);
            var T = {
              source: L,
              volume: M,
              panning: Q,
              volumeEnvelope: p,
              panningEnvelope: q,
              volumeFadeOut: P,
              startVolume: e,
              currentVolume: e,
              startPeriod: d,
              basePeriod: y,
              noteIndex: k,
              startPlaybackRate: I,
              sampleRate: E,
              instrumentIndex: a,
              effects: i,
              track: f,
              time: j,
              scheduled: t,
            };
            return F[G].push(M), J || v.trigger(h.samplePlay, T), T;
          }
          return {};
        }),
        (b.playSilence = function () {
          if (c) {
            var a = c.createBufferSource();
            a.connect(d), a.start();
          }
        }),
        (b.playRaw = function (a, b) {
          if (c && a && a.length) {
            var e;
            e = c.createBuffer(1, a.length, c.sampleRate);
            var f = b / audioContext.sampleRate,
              g = c.createBufferSource();
            (g.buffer = e), (g.loop = !0), (g.playbackRate.value = f), g.connect(d), g.start();
          }
        }),
        (b.isRecording = function () {
          return i;
        }),
        (b.startRecording = function () {
          if (!i && c && c.createMediaStreamDestination) {
            var a = c.createMediaStreamDestination();
            (j = new MediaRecorder(a.stream)),
              (j.ondataavailable = function (a) {
                t.push(a.data);
              }),
              (j.onstop = function (a) {
                var b = new Blob(t, { type: 'audio/ogg; codecs=opus' });
                saveAs(b, 'recording.opus');
              }),
              d.connect(a),
              j.start(),
              (i = !0);
          }
        }),
        (b.stopRecording = function () {
          i && ((i = !1), j.stop());
        }),
        (b.startRendering = function (a) {
          (J = !0), (l = new OfflineAudioContext(2, 44100 * a, 44100)), (b.context = l), b.init(l);
        }),
        (b.stopRendering = function (d) {
          (J = !1),
            l
              .startRendering()
              .then(function (a) {
                d && d(a);
              })
              .catch(function (a) {}),
            (b.context = c),
            a(c),
            b.init(c);
        }),
        (b.setStereoSeparation = function (a) {
          var b,
            c = D.getTrackCount();
          if (D.inFTMode()) b = 0;
          else
            switch (((a = a || C), (C = a), a)) {
              case k.NONE:
                (b = 0), (u.stereoSeparation = k.NONE);
                break;
              case k.FULL:
                (b = 1), (u.stereoSeparation = k.FULL);
                break;
              default:
                (b = 0.5), (u.stereoSeparation = k.BALANCED);
            }
          for (g = 0; g < c; g++) {
            var d = r[g];
            d && d.panningValue(g % 2 == 0 ? -b : b);
          }
        }),
        (b.getPrevSampleRate = function () {
          return H;
        }),
        (b.context = c),
        (b.getSemiToneFrom = function (a, c, d) {
          var e = a;
          if ((d && ((a = b.getFineTuneBasePeriod(a, d)), a || (a = e)), c)) {
            var f = x[a];
            if (f) {
              var g = A.indexOf(f.name),
                h = A[g + c];
              if (h) {
                var i = z[h];
                i && ((e = i.period), d && (e = b.getFineTuneForPeriod(e, d)));
              }
            }
          }
          return e;
        }),
        (b.getNearestSemiTone = function (a, b) {
          var c = 8;
          if (b) {
            var d = D.getInstrument(b);
            d && d.sample.finetune && (c += d.sample.finetune);
          }
          var e = 1e5,
            f = a;
          for (var g in q)
            if (q.hasOwnProperty(g)) {
              var h = q[g].tune[c],
                i = Math.abs(h - a);
              i < e && ((e = i), (f = h));
            }
          return f;
        }),
        (b.getFineTuneForPeriod = function (a, b) {
          var c = a,
            d = x[a];
          if (d && d.tune) {
            var e = 8 + b;
            e >= 0 && e < d.tune.length && (c = d.tune[e]);
          }
          return c;
        }),
        (b.getFineTuneForNote = function (a, b) {
          if (a === s) return 1;
          var c = B[a],
            d = b > 0 ? B[a + 1] : B[a - 1];
          if (c && d) {
            var e = Math.abs(d.period - c.period) / 127;
            return c.period - e * b;
          }
          return c ? c.period : 1e5;
        }),
        (b.getFineTuneBasePeriod = function (a, b) {
          var c = a,
            d = y[b];
          return d && (c = d[a]), c;
        }),
        (b.getSampleRateForPeriod = function (a) {
          return D.inFTMode()
            ? D.useLinearFrequency
              ? 8363 * Math.pow(2, (4608 - a) / 768)
              : p / a
            : o / a;
        }),
        (b.limitAmigaPeriod = function (a) {
          return (a = Math.max(a, 113)), (a = Math.min(a, 856));
        }),
        (b.setAmigaLowPassFilter = function (a, b) {
          var c = a ? 2e3 : 2e4;
          f.frequency.setValueAtTime(c, b);
        }),
        (b.setMasterVolume = function (a, b) {
          (b = b || c.currentTime),
            (a *= 0.7),
            d.gain.setValueAtTime(E, b),
            d.gain.linearRampToValueAtTime(a, b + 0.02),
            (E = a);
        }),
        (b.slideMasterVolume = function (a, b) {
          (b = b || c.currentTime), (a *= 0.7), d.gain.linearRampToValueAtTime(a, b), (E = a);
        }),
        (b.getLastMasterVolume = function () {
          return E / 0.7;
        }),
        (b.clearScheduledNotesCache = function () {
          G++, G > 2 && (G = 0), (F[G] = []);
        }),
        (b.waveFormFunction = {
          sine: function (a, b, c, d) {
            return a + Math.sin(b * c * 0.8) * d * 1.7;
          },
          saw: function (a, b, c, d) {
            var e = 1 - Math.abs(((b * c) / 7) % 1);
            return (e = 2 * e - 1), (e = e * d * -2), a + e;
          },
          square: function (a, b, c, d) {
            var e = Math.sin(b * c) <= 0 ? -1 : 1;
            return (e = e * d * 2), a + e;
          },
          sawInverse: function (a, b, c, d) {
            var e = Math.abs(((b * c) / 7) % 1);
            return (e = 2 * e - 1), (e = e * d * -2), a + e;
          },
        }),
        b
      );
    })();
  !(function (a, b, c) {
    function d(c, f) {
      if (!b[c]) {
        if (!a[c]) {
          var g = 'function' == typeof require && require;
          if (!f && g) return g(c, !0);
          if (e) return e(c, !0);
          throw new Error("Cannot find module '" + c + "'");
        }
        var h = (b[c] = { exports: {} });
        a[c][0].call(
          h.exports,
          function (b) {
            var e = a[c][1][b];
            return d(e ? e : b);
          },
          h,
          h.exports,
        );
      }
      return b[c].exports;
    }
    for (var e = 'function' == typeof require && require, f = 0; f < c.length; f++) d(c[f]);
    return d;
  })(
    {
      1: [
        function (a, b, c) {
          var d = a('./lib/WAAClock');
          (b.exports = d), 'undefined' != typeof window && (window.WAAClock = d);
        },
        { './lib/WAAClock': 2 },
      ],
      3: [
        function (a, b, c) {
          var d = (b.exports = {});
          (d.nextTick = (function () {
            var a = 'undefined' != typeof window && window.setImmediate,
              b = 'undefined' != typeof window && window.postMessage && window.addEventListener;
            if (a)
              return function (a) {
                return window.setImmediate(a);
              };
            if (b) {
              var c = [];
              return (
                window.addEventListener(
                  'message',
                  function (a) {
                    var b = a.source;
                    if (
                      (b === window || null === b) &&
                      'process-tick' === a.data &&
                      (a.stopPropagation(), c.length > 0)
                    ) {
                      var d = c.shift();
                      d();
                    }
                  },
                  !0,
                ),
                function (a) {
                  c.push(a), window.postMessage('process-tick', '*');
                }
              );
            }
            return function (a) {
              setTimeout(a, 0);
            };
          })()),
            (d.title = 'browser'),
            (d.browser = !0),
            (d.env = {}),
            (d.argv = []),
            (d.binding = function (a) {
              throw new Error('process.binding is not supported');
            }),
            (d.cwd = function () {
              return '/';
            }),
            (d.chdir = function (a) {
              throw new Error('process.chdir is not supported');
            });
        },
        {},
      ],
      2: [
        function (a, b, c) {
          var d = a('__browserify_process'),
            e = 'undefined' != typeof window;
          if (e && !AudioContext)
            throw new Error("This browser doesn't seem to support web audio API");
          var f = { toleranceLate: 0.1, toleranceEarly: 0.001 },
            g = function (a, b, c) {
              (this.clock = a),
                (this.func = c),
                (this.repeatTime = null),
                (this.toleranceLate = f.toleranceLate),
                (this.toleranceEarly = f.toleranceEarly),
                (this._armed = !1),
                (this._latestTime = null),
                (this._earliestTime = null),
                this.schedule(b);
            };
          (g.prototype.clear = function () {
            return this.clock._removeEvent(this), this;
          }),
            (g.prototype.repeat = function (a) {
              if (0 === a) throw new Error('delay cannot be 0');
              return (this.repeatTime = a), this;
            }),
            (g.prototype.tolerance = function (a) {
              return (
                'number' == typeof a.late && (this.toleranceLate = a.late),
                'number' == typeof a.early && (this.toleranceEarly = a.early),
                this._update(),
                this
              );
            }),
            (g.prototype.isRepeated = function () {
              return null !== this.repeatTime;
            }),
            (g.prototype.schedule = function (a) {
              (this._armed = !0),
                (this.deadline = a),
                this._update(),
                this.clock.context.currentTime >= this._earliestTime &&
                  (this.clock._removeEvent(this), this._execute());
            }),
            (g.prototype._execute = function () {
              (this._armed = !1),
                this.clock.context.currentTime < this._latestTime
                  ? this.func(this)
                  : v && v.trigger(h.clockEventExpired),
                this._armed === !1 &&
                  this.isRepeated() &&
                  this.schedule(this.deadline + this.repeatTime);
            }),
            (g.prototype._update = function () {
              (this._latestTime = this.deadline + this.toleranceLate),
                (this._earliestTime = this.deadline - this.toleranceEarly),
                this.clock._removeEvent(this),
                this.clock._insertEvent(this);
            });
          var i = (b.exports = function (a, b) {
            (b = b || {}),
              (this.toleranceEarly = b.toleranceEarly || f.toleranceEarly),
              (this.toleranceLate = b.toleranceLate || f.toleranceLate),
              (this.context = a),
              (this._events = []),
              (this._started = !1);
          });
          (i.prototype.setTimeout = function (a, b) {
            return this._createEvent(a, this._absTime(b));
          }),
            (i.prototype.callbackAtTime = function (a, b) {
              return this._createEvent(a, b);
            }),
            (i.prototype.timeStretch = function (a, b, c) {
              var d = this,
                e = d.context.currentTime;
              return (
                b.forEach(function (b) {
                  b.isRepeated() && b.repeat(b.repeatTime * c);
                  var d = a + c * (b.deadline - a);
                  if (b.isRepeated()) for (; e >= d - b.toleranceEarly; ) d += b.repeatTime;
                  b.schedule(d);
                }),
                b
              );
            }),
            (i.prototype.start = function () {
              if (this._started === !1) {
                var a = this;
                (this._started = !0), (this._events = []);
                var b = 256;
                (this._clockNode = this.context.createScriptProcessor(b, 1, 1)),
                  this._clockNode.connect(this.context.destination),
                  (this._clockNode.onaudioprocess = function () {
                    d.nextTick(function () {
                      a._tick();
                    });
                  });
              }
            }),
            (i.prototype.stop = function () {
              this._started === !0 && ((this._started = !1), this._clockNode.disconnect());
            }),
            (i.prototype._tick = function () {
              for (var a = this._events.shift(); a && a._earliestTime <= this.context.currentTime; )
                a._execute(), (a = this._events.shift());
              a && this._events.unshift(a);
            }),
            (i.prototype._createEvent = function (a, b) {
              var c = new g(this, b, a);
              return c.tolerance({ late: this.toleranceLate, early: this.toleranceEarly }), c;
            }),
            (i.prototype._insertEvent = function (a) {
              this._events.splice(this._indexByTime(a._earliestTime), 0, a);
            }),
            (i.prototype._removeEvent = function (a) {
              var b = this._events.indexOf(a);
              b !== -1 && this._events.splice(b, 1);
            }),
            (i.prototype._indexByTime = function (a) {
              for (var b, c = 0, d = this._events.length; c < d; )
                (b = Math.floor((c + d) / 2)),
                  this._events[b]._earliestTime < a ? (c = b + 1) : (d = b);
              return c;
            }),
            (i.prototype._absTime = function (a) {
              return a + this.context.currentTime;
            }),
            (i.prototype._relTime = function (a) {
              return a - this.context.currentTime;
            });
        },
        { __browserify_process: 3 },
      ],
    },
    {},
    [1],
  ),
    (FilterChain = function (a) {
      function b() {
        if (
          ((o = n),
          B && ((r = r || d()), o.connect(r), (o = r)),
          C && ((s = s || f()), o.connect(s), (o = s)),
          D && ((t = t || h()), o.connect(t), (o = t)),
          F && ((u = u || i()), o.connect(u), (o = u)),
          G &&
            ((v = v || O.createConvolver()),
            (x = x || O.createGain()),
            (x.gain.value = 0),
            o.connect(x),
            x.connect(v),
            (p = v)),
          H)
        ) {
          var a = O.createWaveShaper();
          (a.curve = k(400)), (a.oversample = '4x');
        }
        A && ((y = y || w.context.createStereoPanner()), o.connect(y), (o = y)),
          (q = q || O.createGain()),
          o.connect(q),
          p && p.connect(q),
          (o = q);
      }
      function c() {
        n.disconnect(),
          r && r.disconnect(),
          s && s.disconnect(),
          t && t.disconnect(),
          u && u.disconnect(),
          x && x.disconnect(),
          y && y.disconnect(),
          (p = void 0);
      }
      function d() {
        var a = O.createBiquadFilter();
        return (a.type = 'highshelf'), (a.frequency.value = 3200), (a.gain.value = K), a;
      }
      function f() {
        var a = O.createBiquadFilter();
        return (
          (a.type = 'peaking'), (a.frequency.value = 1e3), (a.Q.value = 0.5), (a.gain.value = J), a
        );
      }
      function h() {
        var a = O.createBiquadFilter();
        return (a.type = 'lowshelf'), (a.frequency.value = 320), (a.gain.value = I), a;
      }
      function i() {
        var a = O.createBiquadFilter();
        return (a.type = 'lowpass'), (a.frequency.value = 5e3), a;
      }
      function j() {
        b(), l.volumeValue(L);
      }
      function k(a) {
        for (
          var b,
            c = 'number' == typeof a ? a : 50,
            d = 44100,
            e = new Float32Array(d),
            f = Math.PI / 180,
            g = 0;
          g < d;
          ++g
        )
          (b = (2 * g) / d - 1), (e[g] = ((3 + c) * b * 20 * f) / (Math.PI + c * Math.abs(b)));
        return e;
      }
      var l = {};
      a = a || { volume: !0, panning: !0 };
      var m = !0;
      m && (a = { volume: !0, panning: !0 });
      var n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v,
        x,
        y,
        z = a.volume,
        A = a.panning && w.context.createStereoPanner,
        B = a.high,
        C = a.mid,
        D = a.low,
        F = a.lowPass,
        G = a.reverb,
        H = a.distortion,
        I = 0,
        J = 0,
        K = 0,
        L = 70,
        M = 0,
        N = 30,
        O = w.context;
      return (
        (n = O.createGain()),
        (n.gain.value = 1),
        (o = n),
        (l.lowValue = function (a) {
          if (D) {
            if ('undefined' != typeof a) {
              var b = 20;
              (I = a), (t.gain.value = I * b);
            }
            return I;
          }
        }),
        (l.midValue = function (a) {
          if (C) {
            if ('undefined' != typeof a) {
              var b = 20;
              (J = a), (s.gain.value = J * b);
            }
            return J;
          }
        }),
        (l.highValue = function (a) {
          if (B) {
            if ('undefined' != typeof a) {
              var b = 20;
              (K = a), (r.gain.value = K * b);
            }
            return K;
          }
        }),
        (l.lowPassFrequencyValue = function (a) {
          if (F) {
            var b = 40,
              c = w.context.sampleRate / 2,
              d = Math.log(c / b) / Math.LN2,
              e = Math.pow(2, d * (a - 1));
            u.frequency.value = c * e;
          }
        }),
        (l.lowPassQualityValue = function (a) {
          F && (u.Q.value = a * N);
        }),
        (l.reverbValue = function (a) {
          if (G) {
            if (!v.buffer) {
              var b = e.audio['data/reverb/sportcentre.m4a'];
              if (b) v.buffer = b;
              else {
                var c = E();
                c.load(['data/reverb/sportcentre.m4a'], g.audio, function () {
                  v.buffer = e.audio['data/reverb/sportcentre.m4a'];
                });
              }
            }
            var d = 100,
              f = parseInt(a) / d;
            x.gain.value = f * f;
          }
        }),
        (l.volumeValue = function (a) {
          if (z) {
            if ('undefined' != typeof a) {
              var b = 100;
              L = a;
              var c = a / b;
              q.gain.value = c * c;
            }
            return L;
          }
        }),
        (l.panningValue = function (a, b) {
          if (A)
            return (
              'undefined' != typeof a &&
                ((M = a),
                b ? y.pan.setValueAtTime(M, b) : y.pan.setValueAtTime(M, w.context.currentTime)),
              M
            );
        }),
        (l.setState = function (a, d) {
          c(),
            'high' === a && (B = !!d),
            'mid' === a && (C = !!d),
            'low' === a && (D = !!d),
            'lowPass' === a && (F = !!d),
            'reverb' === a && (G = !!d),
            'panning' === a && (A = !!d && w.context.createStereoPanner),
            b();
        }),
        (l.input = function () {
          return n;
        }),
        (l.output = function () {
          return o;
        }),
        j(),
        l
      );
    });
  var x = {},
    y = {},
    z = {},
    A = [],
    B = [],
    C = [],
    D = (function () {
      function e(a) {
        (a = a || 0),
          (E = E || new WAAClock(w.context)),
          E.start(),
          w.enable(),
          f && f.setStatus('Playing'),
          (ia = []),
          (ja = []),
          (M = G.patterns[a]);
        var b = M.length,
          c = {},
          d = 0,
          e = w.context.currentTime + 0.1,
          h = 0.2,
          j = 1,
          k = M,
          l = Y;
        (ha = []),
          (P = E.setTimeout(function (f) {
            d > 1 && ((h = j), P.repeat(h));
            var n = f.deadline + h;
            for (w.clearScheduledNotesCache(); e < n; ) {
              if (c.pause) {
                if (!c.pasuseHandled) {
                  var o = e - w.context.currentTime;
                  o > 0 &&
                    setTimeout(function () {
                      Q.pause(), Q.setAmigaSpeed(6);
                    }, Math.round(1e3 * o) + 100),
                    (c.pasuseHandled = !0);
                }
                return;
              }
              if ((Q.setStateAtTime(e, { patternPos: d, songPos: l }), c.patternDelay)) {
                for (c.patternDelay--, ka = 0; ka < ba; ka++) m(ka, e);
                e += _ * aa;
              } else if (((c = g(d, e, k, l)), (e += _ * aa), d++, d >= b || c.patternBreak))
                if (
                  ((c.positionBreak && c.targetSongPosition == l) || ((ia = []), (ja = [])),
                  (d = 0),
                  D.getPlayType() == i.song)
                ) {
                  var q = c.positionBreak ? c.targetSongPosition : ++l;
                  q >= G.length && (q = G.restartPosition ? G.restartPosition - 1 : 0),
                    q >= G.length && (q = 0),
                    (l = q),
                    (a = G.patternTable[l]),
                    (k = G.patterns[a]),
                    k || ((k = p()), (G.patterns[a] = k)),
                    (b = k.length),
                    c.patternBreak && ((d = c.targetPatternPosition || 0), d > k.length && (d = 0));
                } else c.patternBreak && ((d = c.targetPatternPosition || 0), d > ca && (d = 0));
            }
            for (ka = 0; ka < ba; ka++) {
              var r = fa[ka];
              if (r && r.time && r.scheduled) {
                var s = Q.getInstrument(r.instrumentIndex);
                if (r.scheduled.volume && e + h >= r.scheduled.volume) {
                  var t = s.scheduleEnvelopeLoop(r.volumeEnvelope, r.scheduled.volume, 2);
                  r.scheduled.volume += t;
                }
                r.scheduled.panning &&
                  e + h >= r.scheduled.panning &&
                  ((t = s.scheduleEnvelopeLoop(r.panningEnvelope, r.scheduled.panning, 2)),
                  (r.scheduled.panning += t));
              }
            }
          }, 0.01)
            .repeat(h)
            .tolerance({ early: 0.1 }));
      }
      function g(a, b, c, d) {
        c = c || M;
        for (var e, f = c[a], g = ba, h = {}, i = 0; i < g; i++)
          (k = f[i]),
            k &&
              k.effect &&
              15 === k.effect &&
              (k.param <= 32
                ? (D.setAmigaSpeed(k.param), 0 === k.param && (h.pause = !0))
                : D.setBPM(k.param));
        for (var i = 0; i < g; i++) {
          var k = f[i];
          if (k) {
            var l = { position: d, step: a },
              n = b;
            if (ea) {
              var o = (Math.random() * ea * 2 - ea) / 1e3;
              n += o;
            }
            (e = j(k, i, n, l)),
              e.patternBreak &&
                ((h.patternBreak = !0), (h.targetPatternPosition = e.targetPatternPosition || 0)),
              e.positionBreak &&
                ((h.positionBreak = !0),
                (h.targetPatternPosition = e.targetPatternPosition || 0),
                (h.targetSongPosition = e.targetSongPosition || 0)),
              e.patternDelay && (h.patternDelay = e.patternDelay);
          }
        }
        for (i = 0; i < g; i++) m(i, b);
        return h;
      }
      function j(a, b, c, d) {
        var e = 100,
          f = {},
          g = a.instrument,
          h = a.period,
          i = a.index;
        h &&
          !g &&
          ((g = fa[b].currentInstrument),
          (e = 'number' == typeof fa[b].currentVolume ? fa[b].currentVolume : e),
          u.emulateProtracker1OffsetBug &&
            g &&
            ga[b].offset &&
            ga[b].offset.instrument === g &&
            (f.offset = ga[b].offset)),
          'number' == typeof a.instrument &&
            ((A = Q.getInstrument(a.instrument)),
            A &&
              ((e = 100 * (A.sample.volume / 64)),
              u.emulateProtracker1OffsetBug &&
                ((ga[b].offset = ga[b].offset || {}),
                (ga[b].offset.value = 0),
                (ga[b].offset.instrument = a.instrument))));
        var j = e,
          l = !0;
        if (('number' == typeof g && (A = Q.getInstrument(g)), i && Q.inFTMode()))
          if ((97 === i && (i = s), i === s)) {
            var m = A || Q.getInstrument(fa[b].currentInstrument);
            (j = m ? m.noteOff(c, fa[b]) : 0), (e = j), (l = !1);
          } else if (
            (A &&
              (A.setSampleForNoteIndex(i), A.sample.relativeNote && (i += A.sample.relativeNote)),
            Q.useLinearFrequency)
          )
            h = 7680 - 64 * (i - 1);
          else {
            var n = B[i];
            n && (h = n.period);
          }
        var o,
          p,
          q = a.param,
          r = {};
        if (a.volumeEffect && Q.inFTMode()) {
          var t = a.volumeEffect;
          if (((o = t >> 4), (p = 15 & t), t > 15 && t <= 80))
            (j = ((t - 16) / 64) * 100), (e = j), (f.volume = { value: j });
          else
            switch (o) {
              case 6:
                f.fade = { value: (p * -1 * 100) / 64 };
                break;
              case 7:
                f.fade = { value: (100 * p) / 64 };
                break;
              case 8:
                f.fade = { value: (100 * -p) / 64, fine: !0 };
                break;
              case 9:
                f.fade = { value: (100 * p) / 64, fine: !0 };
                break;
              case 10:
                break;
              case 11:
                break;
              case 12:
                f.panning = { value: 17 * (t - 192), slide: !1 };
                break;
              case 13:
                f.panning = { value: t, slide: !0 };
                break;
              case 14:
                break;
              case 15:
            }
        }
        switch (a.effect) {
          case 0:
            if (q) {
              (o = q >> 4), (p = 15 & q);
              var v = 0;
              if (((A = A || Q.getInstrument(fa[b].currentInstrument)), Q.inFTMode())) {
                if (A) {
                  var x = i || fa[b].noteIndex,
                    y = A.getPeriodForNote(x, !0);
                  i === s
                    ? (f.arpeggio = ga[b].arpeggio)
                    : ((f.arpeggio = {
                        root: y,
                        interval1: y - A.getPeriodForNote(x + o, !0),
                        interval2: y - A.getPeriodForNote(x + p, !0),
                        step: 1,
                      }),
                      (ga[b].arpeggio = f.arpeggio));
                }
              } else
                (y = h || fa[b].startPeriod),
                  A && ((v = A.getFineTune()), v && (y = w.getFineTuneForPeriod(y, v))),
                  (f.arpeggio = {
                    root: y,
                    interval1: y - w.getSemiToneFrom(y, o, v),
                    interval2: y - w.getSemiToneFrom(y, p, v),
                    step: 1,
                  });
            }
            a.instrument && (f.volume = { value: e });
            break;
          case 1:
            (q *= -1),
              Q.inFTMode() && !q && ga[b].slideUp && (q = ga[b].slideUp.value),
              (f.slide = { value: q }),
              (ga[b].slideUp = f.slide);
            break;
          case 2:
            Q.inFTMode() && !q && ga[b].slideDown && (q = ga[b].slideDown.value),
              (f.slide = { value: q }),
              (ga[b].slideDown = f.slide);
            break;
          case 3:
            l = !1;
            var z = h;
            if (
              (Q.inFTMode() && i === s && (z = 0),
              fa[b].currentInstrument && (g = fa[b].currentInstrument),
              z && g)
            ) {
              var A = Q.getInstrument(g);
              A &&
                A.getFineTune() &&
                (z = Q.inFTMode()
                  ? A.getPeriodForNote(i, !0)
                  : w.getFineTuneForPeriod(z, A.getFineTune()));
            }
            var C = ga[b].slide;
            C && (q || (q = C.value)),
              z || (z = ga[b].defaultSlideTarget),
              (f.slide = {
                value: q,
                target: z,
                canUseGlissando: !0,
                resetVolume: !!a.instrument,
                volume: e,
              }),
              (ga[b].slide = f.slide),
              a.instrument && (f.volume = { value: e });
            break;
          case 4:
            a.instrument &&
              (fa[b].startVolume && (f.volume = { value: j }), (fa[b].vibratoTimer = 0)),
              (o = q >> 4),
              (p = 15 & q);
            var E = (o * _) / 64,
              F = ga[b].vibrato;
            0 == o && F && (E = F.freq),
              0 == p && F && (p = F.amplitude),
              (f.vibrato = { amplitude: p, freq: E }),
              (ga[b].vibrato = f.vibrato);
            break;
          case 5:
            (l = !1),
              (z = h),
              z &&
                g &&
                ((A = Q.getInstrument(g)),
                A &&
                  A.getFineTune() &&
                  (z = Q.inFTMode()
                    ? w.getFineTuneForNote(i, A.getFineTune())
                    : w.getFineTuneForPeriod(z, A.getFineTune()))),
              (q = 1);
            var C = ga[b].slide;
            C && (z || (z = C.target || 0), (q = C.value)),
              (f.slide = { value: q, target: z }),
              (ga[b].slide = f.slide),
              a.instrument && (f.volume = { value: e }),
              (q = a.param),
              q &&
                (a.param < 16 ? (q *= -1) : (q = a.param >> 4),
                (q = (100 * q) / 64),
                (f.fade = { value: q, resetOnStep: !!a.instrument }),
                (ga[b].fade = f.fade));
            break;
          case 6:
            a.instrument &&
              (fa[b].startVolume && (f.volume = { value: j }), (fa[b].vibratoTimer = 0)),
              a.param
                ? (a.param < 16 ? (q *= -1) : (q = 15 & a.param),
                  (q = (100 * q) / 64),
                  (f.fade = { value: q }),
                  (ga[b].fade = f.fade))
                : D.inFTMode() && ga[b].fade && (f.fade = ga[b].fade),
              ga[b].vibrato && (f.vibrato = ga[b].vibrato);
            break;
          case 7:
            h &&
              !a.instrument &&
              (fa[b].startVolume &&
                (f.volume = {
                  value: j,
                }),
              (fa[b].tremoloTimer = 0)),
              (o = q >> 4),
              (p = 15 & q);
            var G = p,
              E = (o * _) / 64,
              H = ga[b].tremolo;
            0 == o && H && (E = H.freq),
              0 == p && H && (G = H.amplitude),
              (f.tremolo = { amplitude: G, freq: E }),
              (ga[b].tremolo = f.tremolo);
            break;
          case 8:
            f.panning = { value: q, slide: !1 };
            break;
          case 9:
            (q <<= 8),
              !q && ga[b].offset && (q = ga[b].offset.stepValue || ga[b].offset.value || 0);
            var I = q;
            u.emulateProtracker1OffsetBug &&
              !a.instrument &&
              ga[b].offset &&
              (q += ga[b].offset.value),
              (f.offset = { value: q, stepValue: I }),
              (ga[b].offset = ga[b].offset || {}),
              (ga[b].offset.value = f.offset.value),
              (ga[b].offset.stepValue = f.offset.stepValue),
              u.emulateProtracker1OffsetBug &&
                (a.instrument && (ga[b].offset.instrument = a.instrument),
                h && (ga[b].offset.value += I)),
              a.instrument && (f.volume = { value: e });
            break;
          case 10:
            if ((a.param < 16 ? (q *= -1) : (q = a.param >> 4), (q = (100 * q) / 64), !a.param)) {
              var J = ga[b].fade;
              J && (q = J.value);
            }
            (f.fade = { value: q, resetOnStep: !!a.instrument }),
              Q.inFTMode() && (ga[b].fade = f.fade);
            break;
          case 11:
            (r.patternBreak = !0),
              (r.positionBreak = !0),
              (r.targetSongPosition = a.param),
              (r.targetPatternPosition = 0);
            break;
          case 12:
            (j = (a.param / 64) * 100), (f.volume = { value: j });
            break;
          case 13:
            (r.patternBreak = !0),
              (o = q >> 4),
              (p = 15 & q),
              (r.targetPatternPosition = 10 * o + p);
            break;
          case 14:
            var K = q >> 4,
              L = 15 & q;
            switch (K) {
              case 0:
                Q.inFTMode() || w.setAmigaLowPassFilter(!L, c);
                break;
              case 1:
                (L *= -1),
                  !L && ga[b].fineSlide && (L = ga[b].fineSlide.value),
                  (f.slide = { value: L, fine: !0 }),
                  (ga[b].fineSlide = f.slide);
                break;
              case 2:
                !L && ga[b].fineSlide && (L = ga[b].fineSlide.value),
                  (f.slide = { value: L, fine: !0 }),
                  (ga[b].fineSlide = f.slide);
                break;
              case 3:
                ga[b].glissando = !!L;
                break;
              case 4:
                switch (L) {
                  case 1:
                    N = w.waveFormFunction.saw;
                    break;
                  case 2:
                    N = w.waveFormFunction.square;
                    break;
                  case 3:
                    N = w.waveFormFunction.sine;
                    break;
                  case 4:
                    N = w.waveFormFunction.sine;
                    break;
                  case 5:
                    N = w.waveFormFunction.saw;
                    break;
                  case 6:
                    N = w.waveFormFunction.square;
                    break;
                  case 7:
                    N = w.waveFormFunction.sine;
                    break;
                  default:
                    N = w.waveFormFunction.sine;
                }
                break;
              case 5:
                if (g) {
                  var A = Q.getInstrument(g);
                  (f.fineTune = { original: A.getFineTune(), instrument: A }), A.setFineTune(L);
                }
                break;
              case 6:
                L
                  ? ((ja[b] = ja[b] || 0),
                    ja[b] < L
                      ? (ja[b]++,
                        (r.patternBreak = !0),
                        (r.positionBreak = !0),
                        (r.targetSongPosition = d.position),
                        (r.targetPatternPosition = ia[b] || 0))
                      : (ja[b] = 0))
                  : (ia[b] = d.step);
                break;
              case 7:
                switch (L) {
                  case 1:
                    O = w.waveFormFunction.saw;
                    break;
                  case 2:
                    O = w.waveFormFunction.square;
                    break;
                  case 3:
                    O = w.waveFormFunction.sine;
                    break;
                  case 4:
                    O = w.waveFormFunction.sine;
                    break;
                  case 5:
                    O = w.waveFormFunction.saw;
                    break;
                  case 6:
                    O = w.waveFormFunction.square;
                    break;
                  case 7:
                    O = w.waveFormFunction.sine;
                    break;
                  default:
                    O = w.waveFormFunction.sine;
                }
                break;
              case 8:
                break;
              case 9:
                L && (f.reTrigger = { value: L });
                break;
              case 10:
                (L = (100 * L) / 64), (f.fade = { value: L, fine: !0 });
                break;
              case 11:
                (L = (100 * L) / 64), (f.fade = { value: -L, fine: !0 });
                break;
              case 12:
                L ? L < _ && (f.cutNote = { value: L }) : (l = !1);
                break;
              case 13:
                L && (L < _ ? (c += aa * L) : (l = !1));
                break;
              case 14:
                r.patternDelay = L;
                break;
              case 15:
            }
            break;
          case 15:
            a.param <= 32 ? D.setAmigaSpeed(a.param, c) : D.setBPM(a.param);
            break;
          case 16:
            (q = Math.min(q, 64)), w.setMasterVolume(q / 64, c);
            break;
          case 17:
            (o = q >> 4), (p = 15 & q);
            var M = 64 * w.getLastMasterVolume(),
              P = 0;
            if (o) {
              var R = c + o * aa;
              P = o * (_ - 1);
            } else p && ((R = c + p * aa), (P = -p * (_ - 1)));
            P &&
              ((q = (M + P) / 64),
              (q = Math.max(0, q)),
              (q = Math.min(1, q)),
              w.slideMasterVolume(q, R));
            break;
          case 20:
            Q.inFTMode() &&
              ((m = A || Q.getInstrument(fa[b].currentInstrument)),
              (j = m ? m.noteOff(c, fa[b]) : 0),
              (e = j),
              (l = !1));
            break;
          case 21:
            break;
          case 25:
            break;
          case 27:
            f.reTrigger = { value: a.param };
            break;
          case 29:
            break;
          case 33:
        }
        return (
          l &&
            g &&
            h &&
            (k(b, c),
            (fa[b] = {}),
            A && (fa[b] = A.play(i, h, j, b, f, c)),
            (ga[b].defaultSlideTarget = fa[b].startPeriod)),
          g &&
            ((fa[b].currentInstrument = g),
            f.fineTune &&
              f.fineTune.instrument &&
              f.fineTune.instrument.setFineTune(f.fineTune.original || 0)),
          A && A.hasVibrato() && (fa[b].hasAutoVibrato = !0),
          (fa[b].effects = f),
          (fa[b].note = a),
          r
        );
      }
      function k(a, b) {
        try {
          if (fa[a].source) {
            var c = fa[a].volume.gain;
            c.setValueAtTime(fa[a].currentVolume / 100, b - 0.002),
              c.linearRampToValueAtTime(0, b),
              fa[a].source.stop(b + 0.02);
          }
        } catch (a) {}
      }
      function l(a, b) {
        var c = Q.getInstrument(a.instrumentIndex);
        if (c) {
          var d = -c.vibrato.rate / 40,
            e = c.vibrato.depth / 8;
          if (
            (Q.useLinearFrequency && (e *= 4),
            (a.vibratoTimer = a.vibratoTimer || 0),
            c.vibrato.sweep && a.vibratoTimer < c.vibrato.sweep)
          ) {
            var f = 1 - (c.vibrato.sweep - a.vibratoTimer) / c.vibrato.sweep;
            e *= f;
          }
          var g = c.getAutoVibratoFunction(),
            h = g(b, a.vibratoTimer, d, e);
          return a.vibratoTimer++, h;
        }
        return b;
      }
      function m(a, b) {
        var c = fa[a],
          d = c.effects;
        if (c && d) {
          var e,
            f = !1;
          if (((c.startVibratoTimer = c.vibratoTimer || 0), c.resetPeriodOnStep && c.source)) {
            var g = c.currentPeriod || c.startPeriod;
            Q.setPeriodAtTime(c, g, b), (c.resetPeriodOnStep = !1);
          }
          if (d.volume) {
            var h = d.volume.value;
            c.volume && c.volume.gain.setValueAtTime(h / 100, b), (c.currentVolume = h);
          }
          if (
            (d.panning &&
              ((e = d.panning.value),
              255 === e && (e = 254),
              c.panning && c.panning.pan.setValueAtTime((e - 127) / 127, b)),
            d.fade)
          ) {
            e = d.fade.value;
            var i,
              j = 1;
            i = d.fade.resetOnStep ? c.startVolume : c.currentVolume;
            var m = _;
            d.fade.fine && ((j = 0), (m = 1));
            for (var n = j; n < m; n++)
              c.volume &&
                (c.volume.gain.setValueAtTime(i / 100, b + n * aa),
                (i += e),
                (i = Math.max(i, 0)),
                (i = Math.min(i, 100)));
            c.currentVolume = i;
          }
          if (d.slide && c.source) {
            var o = c.currentPeriod || c.startPeriod,
              g = o,
              m = _;
            d.slide.fine && (m = 2);
            var p = d.slide.value;
            if (
              (Q.inFTMode() && Q.useLinearFrequency && (p = 4 * d.slide.value),
              (e = Math.abs(p)),
              Q.inFTMode() && d.slide.resetVolume && (c.volumeFadeOut || c.volumeEnvelope))
            ) {
              var q = Q.getInstrument(c.instrumentIndex);
              q && q.resetVolume(b, c);
            }
            c.vibratoTimer = c.startVibratoTimer;
            for (var n = 1; n < m; n++) {
              d.slide.target
                ? ((ga[a].defaultSlideTarget = d.slide.target),
                  g < d.slide.target
                    ? ((g += e), g > d.slide.target && (g = d.slide.target))
                    : ((g -= e), g < d.slide.target && (g = d.slide.target)))
                : ((g += p), ga[a].defaultSlideTarget && (ga[a].defaultSlideTarget += p)),
                Q.inFTMode() || (g = w.limitAmigaPeriod(g));
              var r = g;
              d.slide.canUseGlissando &&
                ga[a].glissando &&
                (r = w.getNearestSemiTone(g, c.instrumentIndex)),
                r !== c.currentPeriod &&
                  ((c.currentPeriod = g),
                  c.hasAutoVibrato && Q.inFTMode() && ((g = l(c, g)), (f = !0)),
                  Q.setPeriodAtTime(c, r, b + n * aa));
            }
          }
          if (d.arpeggio && c.source) {
            var g,
              o = c.currentPeriod || c.startPeriod;
            (c.resetPeriodOnStep = !0), (c.vibratoTimer = c.startVibratoTimer);
            for (var n = 0; n < _; n++) {
              var s = n % 3;
              0 == s && (g = o),
                1 == s && d.arpeggio.interval1 && (g = o - d.arpeggio.interval1),
                2 == s && d.arpeggio.interval2 && (g = o - d.arpeggio.interval2),
                c.hasAutoVibrato && Q.inFTMode() && ((g = l(c, g)), (f = !0)),
                Q.setPeriodAtTime(c, g, b + n * aa);
            }
          }
          if (d.vibrato || (c.hasAutoVibrato && !f)) {
            d.vibrato = d.vibrato || { freq: 0, amplitude: 0 };
            var t = d.vibrato.freq,
              u = d.vibrato.amplitude;
            if (
              (Q.inFTMode() && Q.useLinearFrequency && (u *= 4),
              (c.vibratoTimer = c.vibratoTimer || 0),
              c.source)
            ) {
              (c.resetPeriodOnStep = !0),
                (o = c.currentPeriod || c.startPeriod),
                (c.vibratoTimer = c.startVibratoTimer);
              for (var n = 0; n < _; n++)
                (g = N(o, c.vibratoTimer, t, u)),
                  c.hasAutoVibrato && Q.inFTMode() ? ((g = l(c, g)), (f = !0)) : c.vibratoTimer++,
                  Q.setPeriodAtTime(c, g, b + n * aa);
            }
          }
          if (d.tremolo) {
            var t = d.tremolo.freq,
              u = d.tremolo.amplitude;
            if (((c.tremoloTimer = c.tremoloTimer || 0), c.volume))
              for (var v = c.startVolume, n = 0; n < _; n++)
                (v = O(v, c.tremoloTimer, t, u)),
                  v < 0 && (v = 0),
                  v > 100 && (v = 100),
                  c.volume.gain.setValueAtTime(v / 100, b + n * aa),
                  (c.currentVolume = v),
                  c.tremoloTimer++;
          }
          if (
            (d.cutNote &&
              (c.volume && c.volume.gain.setValueAtTime(0, b + d.cutNote.value * aa),
              (c.currentVolume = 0)),
            d.reTrigger)
          ) {
            var x = c.instrumentIndex,
              y = c.startPeriod;
            h = c.startVolume;
            for (var z = c.noteIndex, A = d.reTrigger.value || 1, B = A; B < _; ) {
              var C = b + B * aa;
              k(a, C), (fa[a] = w.playSample(x, y, h, a, d, C, z)), (B += A);
            }
          }
        }
      }
      function n() {
        f && f.setInfo(G.title),
          G.channels && Q.setTrackCount(G.channels),
          (K = void 0),
          (H = void 0),
          (I = void 0),
          (Z = void 0),
          Q.setCurrentSongPosition(0),
          Q.setCurrentPatternPos(0),
          Q.setCurrentInstrumentIndex(1),
          Q.clearEffectCache(),
          v.trigger(h.songLoaded, G),
          v.trigger(h.songPropertyChange, G);
      }
      function o() {
        Q.setAmigaSpeed(6),
          Q.setBPM(125),
          (N = w.waveFormFunction.sine),
          (O = w.waveFormFunction.sine),
          (ga = []),
          (fa = []);
        for (var a = 0; a < ba; a++) fa.push({}), ga.push({});
        (Q.useLinearFrequency = !1),
          Q.setTrackerMode(t.PROTRACKER),
          w.setMasterVolume(1),
          w.setAmigaLowPassFilter(!1, 0);
      }
      function p() {
        for (var a = [], b = 0; b < ca; b++) {
          var c,
            d = [];
          for (c = 0; c < ba; c++) d.push(L());
          a.push(d);
        }
        return a;
      }
      for (
        var E,
          G,
          H,
          I,
          K,
          M,
          N,
          O,
          P,
          Q = {},
          R = !1,
          S = !1,
          T = [],
          U = 1,
          V = 0,
          W = 0,
          X = i.song,
          Y = 0,
          Z = 0,
          $ = 125,
          _ = 6,
          aa = 2.5 / $,
          ba = 4,
          ca = 64,
          da = t.PROTRACKER,
          ea = 0,
          fa = [],
          ga = [],
          ha = [],
          ia = [],
          ja = [],
          ka = 0;
        ka < ba;
        ka++
      )
        fa.push({}), ga.push({});
      (Q.init = function (a) {
        for (var b = -8; b < 8; b++) y[b] = {};
        for (var c in q)
          if (q.hasOwnProperty(c)) {
            var d = q[c];
            if (((x[d.period] = d), (z[d.name] = d), A.push(d.name), d.tune))
              for (b = -8; b < 8; b++) {
                var e = y[b],
                  g = b + 8;
                e[d.tune[g]] = d.period;
              }
          }
        var h = 0;
        for (c in r)
          if (r.hasOwnProperty(c)) {
            var i = r[c];
            i.period || (i.period = 1),
              B.push(i),
              (C[i.period] = h),
              i.modPeriod && (C[i.modPeriod] = h),
              h++;
          }
        a && (w.init(), a.plugin && f.initPlugin(a));
      }),
        (Q.setCurrentInstrumentIndex = function (a) {
          if (G.instruments[a]) (U = a), H != U && v.trigger(h.instrumentChange, U), (H = U);
          else if (a <= Q.getMaxInstruments()) {
            for (var b = G.instruments.length, c = a; b <= c; b++) Q.setInstrument(b, J());
            var d = [];
            for (b = 1; b <= c; b++) {
              var e = G.instruments[b] || { name: '' };
              d.push({ label: b + ' ' + e.name, data: b }), v.trigger(h.instrumentListChange, d);
            }
            (U = a), H != U && v.trigger(h.instrumentChange, U), (H = U);
          }
        }),
        (Q.getCurrentInstrumentIndex = function () {
          return U;
        }),
        (Q.getCurrentInstrument = function () {
          return T[U];
        }),
        (Q.getMaxInstruments = function () {
          return Q.inFTMode() ? 128 : 31;
        }),
        (Q.setCurrentPattern = function (a) {
          (V = a),
            (M = G.patterns[V]),
            M || ((M = p()), (G.patterns[V] = M)),
            (ca = M.length),
            I != V && v.trigger(h.patternChange, V),
            (I = V);
        }),
        (Q.getCurrentPattern = function () {
          return V;
        }),
        (Q.getCurrentPatternData = function () {
          return M;
        }),
        (Q.updatePatternTable = function (a, b) {
          (G.patternTable[a] = b),
            v.trigger(h.patternTableChange, b),
            a == Y && ((I = void 0), D.setCurrentPattern(b));
        }),
        (Q.setCurrentPatternPos = function (a) {
          (W = a), K != W && v.trigger(h.patternPosChange, { current: W, prev: K }), (K = W);
        }),
        (Q.getCurrentPatternPos = function () {
          return W;
        }),
        (Q.moveCurrentPatternPos = function (a) {
          var b = W + a,
            c = ca - 1;
          b < 0 && (b = c), b > c && (b = 0), Q.setCurrentPatternPos(b);
        }),
        (Q.getCurrentSongPosition = function () {
          return Y;
        }),
        (Q.setCurrentSongPosition = function (a, b) {
          (Y = a),
            Y != Z &&
              (v.trigger(h.songPositionChange, Y),
              G.patternTable && Q.setCurrentPattern(G.patternTable[Y]),
              (Z = Y),
              b && Q.isPlaying() && (Q.stop(), Q.togglePlay()));
        }),
        (Q.addToPatternTable = function (a, b) {
          'undefined' == typeof a && (a = G.length),
            (b = b || 0),
            a == G.length && ((G.patternTable[a] = b), G.length++),
            v.trigger(h.songPropertyChange, G),
            v.trigger(h.patternTableChange);
        }),
        (Q.removeFromPatternTable = function (a) {
          G.length < 2 ||
            ('undefined' == typeof a && (a = G.length - 1),
            a == G.length - 1 && ((G.patternTable[a] = 0), G.length--),
            Y == G.length && Q.setCurrentSongPosition(Y - 1),
            v.trigger(h.songPropertyChange, G),
            v.trigger(h.patternTableChange));
        }),
        (Q.setPlayType = function (a) {
          (X = a), v.trigger(h.playTypeChange, X);
        }),
        (Q.getPlayType = function () {
          return X;
        }),
        (Q.playSong = function () {
          Q.stop(),
            w.checkState(),
            Q.setPlayType(i.song),
            (S = !0),
            e(V),
            v.trigger(h.playingChange, S);
        }),
        (Q.playPattern = function () {
          Q.stop(),
            w.checkState(),
            (W = 0),
            Q.setPlayType(i.pattern),
            (S = !0),
            e(V),
            v.trigger(h.playingChange, S);
        }),
        (Q.stop = function () {
          E && E.stop(),
            w.disable(),
            w.setMasterVolume(1),
            f && (f.setStatus('Ready'), Input.clearInputNotes()),
            Q.clearEffectCache();
          for (var a = 0; a < ba; a++)
            if (fa[a].source)
              try {
                fa[a].source.stop();
              } catch (a) {}
          (S = !1), v.trigger(h.playingChange, S);
        }),
        (Q.pause = function () {
          E && E.stop(), (S = !1), v.trigger(h.playingChange, S);
        }),
        (Q.togglePlay = function () {
          Q.isPlaying() ? Q.stop() : X == i.pattern ? Q.playPattern() : Q.playSong();
        }),
        (Q.getProperties = function () {
          return { ticksPerStep: _, tickTime: aa };
        }),
        (Q.playPatternStep = g),
        (Q.cutNote = k),
        (Q.setBPM = function (a) {
          E && E.timeStretch(w.context.currentTime, [P], $ / a),
            ($ = a),
            (aa = 2.5 / $),
            v.trigger(h.songBPMChange, $);
        }),
        (Q.getBPM = function () {
          return $;
        }),
        (Q.setAmigaSpeed = function (a) {
          _ = a;
        }),
        (Q.getAmigaSpeed = function () {
          return _;
        }),
        (Q.getSwing = function () {
          return ea;
        }),
        (Q.setSwing = function (a) {
          ea = a;
        }),
        (Q.getPatternLength = function () {
          return ca;
        }),
        (Q.setPatternLength = function (a) {
          ca = a;
          var b = G.patterns[V].length;
          if (b !== ca) {
            if (b < ca)
              for (var c = b; c < ca; c++) {
                var d,
                  e = [];
                for (d = 0; d < ba; d++) e.push(L());
                G.patterns[V].push(e);
              }
            else
              (G.patterns[V] = G.patterns[V].splice(0, ca)),
                W >= ca && Q.setCurrentPatternPos(ca - 1);
            v.trigger(h.patternChange, V);
          }
        }),
        (Q.getTrackCount = function () {
          return ba;
        }),
        (Q.setTrackCount = function (a) {
          ba = a;
          for (var b = fa.length; b < ba; b++) fa.push({});
          for (b = ga.length; b < ba; b++) ga.push({});
          v.trigger(h.trackCountChange, ba);
        }),
        (Q.toggleRecord = function () {
          Q.stop(), (R = !R), v.trigger(h.recordingChange, R);
        }),
        (Q.isPlaying = function () {
          return S;
        }),
        (Q.isRecording = function () {
          return R;
        }),
        (Q.setStateAtTime = function (a, b) {
          ha.push({ time: a, state: b });
        }),
        (Q.getStateAtTime = function (a) {
          for (var b = void 0, c = 0, d = ha.length; c < d; c++) {
            var e = ha[0];
            if (!(e.time < a)) return b;
            b = ha.shift().state;
          }
          return b;
        }),
        (Q.getTimeStates = function () {
          return ha;
        }),
        (Q.setPeriodAtTime = function (a, b, c) {
          if (((b = Math.max(b, 1)), Q.inFTMode() && Q.useLinearFrequency))
            var d = 8363 * Math.pow(2, (4608 - b) / 768),
              e = d / w.context.sampleRate;
          else (e = a.startPeriod / b), (e *= a.startPlaybackRate);
          a.source.playbackRate.setValueAtTime(e, c),
            a.source.playbackRate.setValueAtTime(e, c + 0.005);
        }),
        (Q.load = function (b, c, e) {
          (b = b || 'demomods/StardustMemories.mod'),
            b.indexOf('://') < 0 && 0 !== b.indexOf('/') && (b = d.getBaseUrl() + b),
            f && (f.setInfo(''), f.setLoading());
          var g = function (a) {
              Q.processFile(a, i, function (a) {
                if ((f && f.setStatus('Ready'), a)) {
                  var d = '',
                    g = '';
                  if ('string' == typeof b) {
                    if (b.indexOf('modarchive.org') > 0) {
                      var j = b.split('moduleid=')[1];
                      (G.filename = j.split('#')[1] || j),
                        (j = j.split('#')[0]),
                        (j = j.split('&')[0]),
                        (g = 'modArchive'),
                        (d =
                          'https://modarchive.org/index.php?request=view_by_moduleid&query=' + j),
                        v.trigger(h.songPropertyChange, G);
                    }
                    b.indexOf('modules.pl') > 0 &&
                      ((j = b.split('modules.pl/')[1]),
                      (G.filename = j.split('#')[1] || j),
                      (j = j.split('#')[0]),
                      (j = j.split('&')[0]),
                      (g = 'modules.pl'),
                      (d = 'http://www.modules.pl/?id=module&mod=' + j),
                      v.trigger(h.songPropertyChange, G));
                  }
                  f && f.setInfo(G.title, g, d);
                }
                if (f && a && !c) {
                  var k = window.location.pathname,
                    l = k.substring(k.lastIndexOf('/') + 1);
                  window.history.pushState &&
                    window.history.pushState({}, i, l + '?file=' + encodeURIComponent(b));
                }
                a && la(c), e && e();
              });
            },
            i = '';
          'string' == typeof b
            ? ((i = b.substr(b.lastIndexOf('/') + 1)),
              a(b, function (a) {
                g(a);
              }))
            : ((i = b.name || ''), (c = !0), g(b.buffer || b));
        });
      var la = function (a) {
        var b = c('autoplay');
        !f && a && (b = '1'), ('true' != b && '1' != b) || D.playSong();
      };
      return (
        (Q.handleUpload = function (a) {
          if (a.length) {
            var b = a[0],
              c = new FileReader();
            (c.onload = function () {
              Q.processFile(c.result, b.name, function (a) {
                f && f.setStatus('Ready');
              });
            }),
              c.readAsArrayBuffer(b);
          }
        }),
        (Q.processFile = function (a, c, d) {
          var e = !1,
            g = new b(a, !0),
            h = F.detect(g, c);
          h &&
            'ZIP' == h.name &&
            (f && f.setStatus('Extracting Zip file'),
            (zip.workerScriptsPath = 'script/src/lib/zip/'),
            zip.createReader(
              new zip.ArrayBufferReader(a),
              function (a) {
                var b,
                  e = 0;
                a.getEntries(function (a) {
                  a &&
                    a.length &&
                    a.forEach(function (a) {
                      a.uncompressedSize > e && ((e = a.uncompressedSize), (b = a));
                    }),
                    b
                      ? b.getData(new zip.ArrayBufferWriter(), function (a) {
                          a && a.byteLength && Q.processFile(a, c, d);
                        })
                      : d && d(!1);
                });
              },
              function (a) {
                d && d(!1);
              },
            )),
            h.isMod &&
              h.loader &&
              ((e = !0),
              Q.isPlaying() && Q.stop(),
              o(),
              (G = h.loader().load(g, c)),
              (G.filename = c),
              n()),
            h.isSample && Editor.importSample(g, c),
            d && d(e);
        }),
        (Q.getSong = function () {
          return G;
        }),
        (Q.getInstruments = function () {
          return T;
        }),
        (Q.getInstrument = function (a) {
          return T[a];
        }),
        (Q.setInstrument = function (a, b) {
          (b.instrumentIndex = a), (T[a] = b);
        }),
        (Q.clearEffectCache = function () {
          ga = [];
          for (var a = 0; a < ba; a++) ga.push({});
        }),
        (Q.clearInstruments = function (a) {
          if (G) {
            var b = [],
              c = a || G.instruments.length - 1;
            for (T = [], ka = 1; ka <= c; ka++)
              Q.setInstrument(ka, J()), b.push({ label: ka + ' ', data: ka });
            (G.instruments = T),
              v.trigger(h.instrumentListChange, b),
              v.trigger(h.instrumentChange, U);
          }
        }),
        (Q.setTrackerMode = function (a) {
          (da = a),
            (u.emulateProtracker1OffsetBug = !Q.inFTMode()),
            v.trigger(h.trackerModeChanged, a);
        }),
        (Q.getTrackerMode = function () {
          return da;
        }),
        (Q.inFTMode = function () {
          return da === t.FASTTRACKER;
        }),
        (Q.new = function () {
          o(),
            (G = { patterns: [], instruments: [] }),
            Q.clearInstruments(31),
            (G.typeId = 'M.K.'),
            (G.title = 'new song'),
            (G.length = 1),
            (G.restartPosition = 0),
            G.patterns.push(p());
          for (var a = [], b = 0; b < 128; ++b) a[b] = 0;
          (G.patternTable = a), n();
        }),
        (Q.clearInstrument = function () {
          (T[U] = J()), v.trigger(h.instrumentChange, U), v.trigger(h.instrumentNameChange, U);
        }),
        (Q.getFileName = function () {
          return (
            G.filename ||
            (G.title ? G.title.replace(/ /g, '-').replace(/\W/g, '') + '.mod' : 'new.mod')
          );
        }),
        (Q.useLinearFrequency = !0),
        Q
      );
    })(),
    E = function () {
      var a = {};
      a.load = function (c, d, e) {
        (a.type = d || g.image), (a.loadCount = 0), (a.max = c.length), (a.next = e);
        for (var f = 0, h = c.length; f < h; f++) b(c[f]);
      };
      var b = function (b) {
        if (a.type == g.image) {
          var c = new Image();
          (c.onload = function () {
            (e.images[b] = this), ++a.loadCount == a.max && a.next && a.next();
          }),
            (c.onerror = function () {
              alert('BufferLoader: XHR error');
            }),
            (c.src = b);
        }
        if (a.type == g.audio) {
          var d = new XMLHttpRequest();
          (d.responseType = 'arraybuffer'),
            d.open('GET', b, !0),
            (d.onload = function () {
              w.context.decodeAudioData(
                d.response,
                function (c) {
                  return c
                    ? ((e.audio[b] = c), void (++a.loadCount == a.max && a.next && a.next()))
                    : void alert('error decoding file data: ' + b);
                },
                function (a) {},
              );
            }),
            (d.onerror = function () {
              alert('BufferLoader: XHR error');
            }),
            d.send();
        }
      };
      return a;
    },
    F =
      ((function () {
        var a = {},
          b = 3e4;
        return (
          (a.get = function (b, c) {
            a.ajax({
              url: b,
              success: function (a) {
                c(a);
              },
              error: function (a) {
                c(void 0, a);
              },
            });
          }),
          (a.post = function (b, c, d) {
            var e = c;
            if ('object' == typeof c) {
              e = '';
              for (var f in c)
                c.hasOwnProperty(f) && (e += '&' + f + '=' + encodeURIComponent(c[f]));
              e.length && (e = e.substr(1));
            }
            a.ajax({
              method: 'POST',
              url: b,
              data: e,
              datatype: 'form',
              success: function (a) {
                d(a);
              },
              error: function (a) {
                d(void 0, a);
              },
            });
          }),
          (a.sendBinary = function (b, c, d) {
            a.ajax({
              method: 'POST',
              url: b,
              data: c,
              success: function (a) {
                d(a);
              },
              error: function (a) {
                d(void 0, a);
              },
            });
          }),
          (a.json = function (b, c) {
            'undefined' == typeof c && (c = function () {}),
              a.ajax({
                url: b,
                cache: !1,
                datatype: 'json',
                headers: [{ key: 'Accept', value: 'application/json' }],
                success: function (a) {
                  c(a);
                },
                error: function (a) {
                  c(void 0, a);
                },
              });
          }),
          (a.html = function (b, c) {
            a.ajax({
              url: b,
              cache: !1,
              datatype: 'html',
              success: function (a) {
                c(a);
              },
              error: function (a) {
                c(void 0, a);
              },
            });
          }),
          (a.ajax = function (a) {
            var c = new XMLHttpRequest();
            (a.error =
              a.error ||
              function () {
                a.success(!1);
              }),
              'jsonp' === a.datatype && a.error(c);
            var e = a.url;
            if ('boolean' == typeof a.cache && !a.cache && d.useUrlParams) {
              var f = new Date().getTime();
              e += e.indexOf('?') > 0 ? '&r=' + f : '?r=' + f;
            }
            var g = a.method || 'GET';
            (c.onreadystatechange = function () {
              if (!(c.readyState < 4) && 4 === c.readyState)
                if (200 !== c.status && 201 !== c.status) a.error(c);
                else {
                  var b = c.responseText;
                  'json' === a.datatype && (b = JSON.parse(b)),
                    'html' === a.datatype &&
                      ((b = document.createElement('div')), (b.innerHTML = c.responseText)),
                    a.success(b);
                }
            }),
              (c.ontimeout = function (a) {}),
              c.open(g, e, !0),
              (c.timeout = a.timeout || b),
              a.headers &&
                a.headers.forEach(function (a) {
                  c.setRequestHeader(a.key, a.value);
                });
            var h = a.data || '';
            'POST' === g &&
              a.data &&
              'form' === a.datatype &&
              c.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'),
              c.send(h);
          }),
          a
        );
      })(),
      (function () {
        var a = {},
          b = {
            unknown: { name: 'UNKNOWN' },
            unsupported: { name: 'UNSUPPORTED' },
            mod_ProTracker: {
              name: 'PROTRACKER',
              isMod: !0,
              loader: function () {
                return G();
              },
            },
            mod_SoundTracker: {
              name: 'SOUNDTRACKER',
              isMod: !0,
              loader: function () {
                return H();
              },
            },
            mod_FastTracker: {
              name: 'FASTTRACKER',
              isMod: !0,
              loader: function () {
                return I();
              },
            },
            sample: { name: 'SAMPLE', isSample: !0 },
            zip: { name: 'ZIP' },
          };
        return (
          (a.detect = function (a, c) {
            function d(a) {
              return a < 128;
            }
            function e() {
              a.goto(0);
              for (var b = 0; b < 20; b++) if (!d(a.readByte())) return !1;
              for (var c = 0, e = 0, g = 0; g < 15; g++) {
                for (b = 0; b < 22; b++) if (!d(a.readByte())) return !1;
                a.jump(-22);
                var h = a.readString(22);
                if (('st-' == h.toLowerCase().substr(0, 3) && (e += 10), e > 20)) return !0;
                (c += a.readWord()), a.jump(6);
              }
              return !(2 * c + 1624 > f);
            }
            var f = a.length,
              g = '';
            if (((g = a.readString(17, 0)), 'Extended Module: ' == g)) return b.mod_FastTracker;
            if ((f > 1100 && (g = a.readString(4, 1080)), 'M.K.' == g)) return b.mod_ProTracker;
            if ('M!K!' == g) return b.mod_ProTracker;
            if ('M&K!' == g) return b.mod_ProTracker;
            if ('FLT4' == g) return b.mod_ProTracker;
            if ('2CHN' == g) return b.mod_ProTracker;
            if ('6CHN' == g) return b.mod_ProTracker;
            if ('8CHN' == g) return b.mod_ProTracker;
            if ('10CH' == g) return b.mod_ProTracker;
            if ('12CH' == g) return b.mod_ProTracker;
            if ('14CH' == g) return b.mod_ProTracker;
            if ('16CH' == g) return b.mod_ProTracker;
            if ('18CH' == g) return b.mod_ProTracker;
            if ('20CH' == g) return b.mod_ProTracker;
            if ('22CH' == g) return b.mod_ProTracker;
            if ('24CH' == g) return b.mod_ProTracker;
            if ('26CH' == g) return b.mod_ProTracker;
            if ('28CH' == g) return b.mod_ProTracker;
            if ('30CH' == g) return b.mod_ProTracker;
            if ('32CH' == g) return b.mod_ProTracker;
            var h = '';
            if (
              (c && c.length > 4 && (h = c.substr(c.length - 4)),
              (h = h.toLowerCase()),
              '.wav' == h)
            )
              return b.sample;
            if ('.mp3' == h) return b.sample;
            if ('.iff' == h) return b.sample;
            if ('.zip' == h) return b.zip;
            var i = a.readString(2, 0);
            if ('PK' == i) return b.zip;
            if (c && c.indexOf('.') >= 0 && f > 1624) {
              var j = e();
              if (j) return b.mod_SoundTracker;
            }
            return b.sample;
          }),
          a
        );
      })()),
    G = function () {
      var a = {};
      return (
        (a.load = function (a, b) {
          D.setTrackerMode(t.PROTRACKER), (D.useLinearFrequency = !1), D.clearInstruments(31);
          var c = { patterns: [], restartPosition: 1 },
            d = 64,
            e = 31,
            f = 4;
          (c.typeId = a.readString(4, 1080)),
            (c.title = a.readString(20, 0)),
            '2CHN' === c.typeId && (f = 2),
            '6CHN' === c.typeId && (f = 6),
            '8CHN' === c.typeId && (f = 8),
            '10CH' === c.typeId && (f = 10),
            '12CH' === c.typeId && (f = 12),
            '14CH' === c.typeId && (f = 14),
            '16CH' === c.typeId && (f = 16),
            '18CH' === c.typeId && (f = 18),
            '20CH' === c.typeId && (f = 20),
            '22CH' === c.typeId && (f = 22),
            '24CH' === c.typeId && (f = 24),
            '26CH' === c.typeId && (f = 26),
            '28CH' === c.typeId && (f = 28),
            '30CH' === c.typeId && (f = 30),
            '32CH' === c.typeId && (f = 32),
            (c.channels = f);
          var g = 0;
          for (q = 1; q <= e; ++q) {
            var i = a.readString(22),
              k = a.readWord(),
              m = J();
            (m.name = i), (m.sample.length = m.sample.realLen = k << 1);
            var n = a.readUbyte();
            n > 7 && (n -= 16),
              m.setFineTune(n),
              (m.sample.volume = a.readUbyte()),
              (m.sample.loop.start = a.readWord() << 1),
              (m.sample.loop.length = a.readWord() << 1),
              (m.sample.loop.enabled = m.sample.loop.length > 2),
              (m.sample.loop.type = l.FORWARD),
              (m.pointer = g),
              (g += m.sample.length),
              m.setSampleIndex(0),
              D.setInstrument(q, m);
          }
          (c.instruments = D.getInstruments()), a.goto(950), (c.length = a.readUbyte()), a.jump(1);
          for (var o = [], p = 0, q = 0; q < 128; ++q)
            (o[q] = a.readUbyte()), o[q] > p && (p = o[q]);
          for (c.patternTable = o, a.goto(1084), q = 0; q <= p; ++q) {
            for (var r = [], s = 0; s < d; s++) {
              var w,
                x = [];
              for (w = 0; w < f; w++) {
                var y = L(),
                  z = a.readUint();
                y.setPeriod((z >> 16) & 4095),
                  (y.effect = (z >> 8) & 15),
                  (y.instrument = ((z >> 24) & 240) | ((z >> 12) & 15)),
                  (y.param = 255 & z),
                  x.push(y);
              }
              for (w = f; w < D.getTrackCount(); w++) x.push(L());
              r.push(x);
            }
            c.patterns.push(r);
          }
          var A = [];
          for (q = 1; q <= e; q++)
            if ((m = D.getInstrument(q))) {
              var B = m.sample.length;
              for (
                m.sample.loop.length > 2 &&
                  u.unrollShortLoops &&
                  m.sample.loop.length < 1e3 &&
                  ((B = Math.min(B, m.sample.loop.start + m.sample.loop.length)),
                  (m.sample.length = B)),
                  j = 0;
                j < B;
                j++
              ) {
                var C = a.readByte();
                j < 2 && (C = 0), m.sample.data.push(C / 127);
              }
              if ((u.unrollShortLoops || u.unrollLoops) && m.sample.loop.length > 2) {
                var E = Math.ceil(4e4 / m.sample.loop.length) + 1;
                u.unrollLoops || (E = 0);
                var F = !1,
                  G = 0;
                u.unrollShortLoops &&
                  m.sample.loop.length < 1600 &&
                  ((E = Math.floor(1e3 / m.sample.loop.length)), (F = !0));
                for (var H = 0; H < E; H++) {
                  var I = m.sample.loop.start,
                    K = I + m.sample.loop.length;
                  for (j = I; j < K; j++) m.sample.data.push(m.sample.data[j]);
                  G += m.sample.loop.length;
                }
                F && G && ((m.sample.loop.length += G), (m.sample.length += G));
              }
              A.push({ label: q + ' ' + m.name, data: q });
            }
          return v.trigger(h.instrumentListChange, A), c;
        }),
        (a.write = function (a) {
          var c = D.getSong(),
            d = D.getInstruments(),
            e = D.getTrackCount(),
            f = D.getPatternLength(),
            g = 1084,
            h = 0;
          for (j = 0; j < 128; j++) {
            var i = c.patternTable[j] || 0;
            h = Math.max(h, i);
          }
          (g += (h + 1) * (256 * e)),
            d.forEach(function (a) {
              a && (a.setSampleIndex(0), (g += a.sample.length));
            });
          var j,
            k = new ArrayBuffer(g),
            l = new b(k, !0);
          for (
            l.writeStringSection(c.title, 20),
              d.forEach(function (a) {
                a
                  ? ((a.sample.length = Math.min(a.sample.length, 131070)),
                    l.writeStringSection(a.name, 22),
                    l.writeWord(a.sample.length >> 1),
                    l.writeUByte(a.sample.finetune),
                    l.writeUByte(a.sample.volume),
                    l.writeWord(a.sample.loop.start >> 1),
                    l.writeWord(a.sample.loop.length >> 1))
                  : l.clear(30);
              }),
              l.writeUByte(c.length),
              l.writeUByte(127),
              j = 0;
            j < 128;
            j++
          ) {
            var i = c.patternTable[j] || 0;
            l.writeUByte(i);
          }
          for (l.writeString(8 == e ? '8CHN' : 'M.K.'), j = 0; j <= h; j++)
            for (var m = c.patterns[j], n = 0; n < f; n++)
              for (var o = m[n], p = 0; p < e; p++) {
                var q = o[p],
                  r = 0,
                  s = q.instrument;
                s > 15 && ((r = 16), (s = q.instrument - 16));
                var t = (r << 24) + (q.period << 16) + (s << 12) + (q.effect << 8) + q.param;
                l.writeUint(t);
              }
          d.forEach(function (a) {
            if (a && a.sample.data && a.sample.length) {
              l.clear(2);
              var b;
              for (j = 0; j < a.sample.length - 2; j++)
                (b = a.sample.data[j] || 0), l.writeByte(Math.round(127 * b));
            }
          }),
            a && a(l);
        }),
        a
      );
    },
    H = function () {
      var a = {};
      return (
        (a.load = function (a, b) {
          D.setTrackerMode(t.PROTRACKER), (D.useLinearFrequency = !1), D.clearInstruments(15);
          var c = { patterns: [], restartPosition: 1 },
            d = 64,
            e = 15;
          (c.typeId = 'ST'), (c.channels = 4), (c.title = a.readString(20, 0));
          var f = 0;
          for (o = 1; o <= e; ++o) {
            var g = a.readString(22),
              i = a.readWord(),
              k = J();
            (k.name = g),
              (k.sample.length = k.realLen = i << 1),
              (k.sample.volume = a.readWord()),
              k.setFineTune(0),
              (k.sample.loop.start = a.readWord()),
              (k.sample.loop.length = a.readWord() << 1),
              (k.sample.loop.enabled = k.sample.loop.length > 2),
              (k.sample.loop.type = l.FORWARD),
              (k.pointer = f),
              (f += k.sample.length),
              k.setSampleIndex(0),
              D.setInstrument(o, k);
          }
          (c.instruments = D.getInstruments()),
            a.goto(470),
            (c.length = a.readUbyte()),
            (c.speed = a.readUbyte());
          for (var m = [], n = 0, o = 0; o < 128; ++o)
            (m[o] = a.readUbyte()), m[o] > n && (n = m[o]);
          for (c.patternTable = m, a.goto(600), o = 0; o <= n; ++o) {
            for (var p = [], q = 0; q < d; q++) {
              var r,
                s = [];
              for (r = 0; r < 4; r++) {
                var u = {},
                  w = a.readUint();
                (u.period = (w >> 16) & 4095),
                  (u.effect = (w >> 8) & 15),
                  (u.instrument = ((w >> 24) & 240) | ((w >> 12) & 15)),
                  (u.param = 255 & w),
                  s.push(u);
              }
              for (r = 4; r < D.getTrackCount(); r++)
                s.push({ note: 0, effect: 0, instrument: 0, param: 0 });
              p.push(s);
            }
            c.patterns.push(p);
          }
          var x = [];
          for (o = 1; o <= e; o++)
            if ((k = D.getInstrument(o))) {
              var y = k.sample.length;
              for (j = 0; j < y; j++) {
                var z = a.readByte();
                j < 2 && (z = 0), k.sample.data.push(z / 127);
              }
              x.push({ label: o + ' ' + k.name, data: o });
            }
          return v.trigger(h.instrumentListChange, x), c;
        }),
        a
      );
    },
    I = function () {
      var a = {};
      return (
        (a.load = function (b, c) {
          function d(a) {
            for (a.points = [], x = 0; x < 12; x++) a.points.push(a.raw.slice(2 * x, 2 * x + 2));
            return (
              1 & a.type && (a.enabled = !0),
              2 & a.type && (a.sustain = !0),
              4 & a.type && (a.loop = !0),
              a
            );
          }
          D.setTrackerMode(t.FASTTRACKER), D.clearInstruments(1);
          var e = {},
            f = { patterns: [], instruments: [] };
          (b.litteEndian = !0),
            b.goto(17),
            (f.title = b.readString(20)),
            b.jump(1),
            (e.trackerName = b.readString(20)),
            (e.trackerVersion = b.readByte()),
            (e.trackerVersion = b.readByte() + '.' + e.trackerVersion),
            (e.headerSize = b.readDWord()),
            (e.songlength = b.readWord()),
            (e.restartPosition = b.readWord()),
            (e.numberOfChannels = b.readWord()),
            (e.numberOfPatterns = b.readWord()),
            (e.numberOfInstruments = b.readWord()),
            (e.flags = b.readWord()),
            (D.useLinearFrequency = e.flags % 2 === 1),
            (e.defaultTempo = b.readWord()),
            (e.defaultBPM = b.readWord());
          for (var g = [], i = 0, j = 0; j < e.songlength; ++j)
            (g[j] = b.readUbyte()), i < g[j] && (i = g[j]);
          (f.patternTable = g),
            (f.length = e.songlength),
            (f.channels = e.numberOfChannels),
            (f.restartPosition = e.restartPosition + 1);
          var k = 60 + e.headerSize;
          for (b.goto(k), j = 0; j < e.numberOfPatterns; j++) {
            var m = [],
              n = {};
            (n.headerSize = b.readDWord()),
              (n.packingType = b.readUbyte()),
              (n.patternLength = b.readWord()),
              (n.patternSize = b.readWord()),
              (k += n.headerSize),
              b.goto(k);
            for (var o = 0; o < n.patternLength; o++) {
              var p,
                q = [];
              for (p = 0; p < e.numberOfChannels; p++) {
                var r = L(),
                  s = b.readUbyte();
                128 & s
                  ? (1 & s && r.setIndex(b.readUbyte()),
                    2 & s && (r.instrument = b.readUbyte()),
                    4 & s && (r.volumeEffect = b.readUbyte()),
                    8 & s && (r.effect = b.readUbyte()),
                    16 & s && (r.param = b.readUbyte()))
                  : (r.setIndex(s),
                    (r.instrument = b.readUbyte()),
                    (r.volumeEffect = b.readUbyte()),
                    (r.effect = b.readUbyte()),
                    (r.param = b.readUbyte())),
                  q.push(r);
              }
              m.push(q);
            }
            (k += n.patternSize), b.goto(k), f.patterns.push(m);
          }
          var u = [];
          for (j = 1; j <= e.numberOfInstruments; ++j) {
            var w = J();
            try {
              if (
                ((w.filePosition = b.index),
                (w.headerSize = b.readDWord()),
                (w.name = b.readString(22)),
                (w.type = b.readUbyte()),
                (w.numberOfSamples = b.readWord()),
                (w.samples = []),
                (w.sampleHeaderSize = 0),
                w.numberOfSamples > 0)
              ) {
                (w.sampleHeaderSize = b.readDWord()),
                  (w.sampleHeaderSize = Math.max(w.sampleHeaderSize, 40)),
                  w.sampleHeaderSize > 200 && (w.sampleHeaderSize = 40);
                for (var x = 0; x < 96; x++) w.sampleNumberForNotes.push(b.readUbyte());
                for (x = 0; x < 24; x++) w.volumeEnvelope.raw.push(b.readWord());
                for (x = 0; x < 24; x++) w.panningEnvelope.raw.push(b.readWord());
                (w.volumeEnvelope.count = b.readUbyte()),
                  (w.panningEnvelope.count = b.readUbyte()),
                  (w.volumeEnvelope.sustainPoint = b.readUbyte()),
                  (w.volumeEnvelope.loopStartPoint = b.readUbyte()),
                  (w.volumeEnvelope.loopEndPoint = b.readUbyte()),
                  (w.panningEnvelope.sustainPoint = b.readUbyte()),
                  (w.panningEnvelope.loopStartPoint = b.readUbyte()),
                  (w.panningEnvelope.loopEndPoint = b.readUbyte()),
                  (w.volumeEnvelope.type = b.readUbyte()),
                  (w.panningEnvelope.type = b.readUbyte()),
                  (w.vibrato.type = b.readUbyte()),
                  (w.vibrato.sweep = b.readUbyte()),
                  (w.vibrato.depth = Math.min(b.readUbyte(), 15)),
                  (w.vibrato.rate = b.readUbyte()),
                  (w.fadeout = b.readWord()),
                  (w.reserved = b.readWord()),
                  (w.volumeEnvelope = d(w.volumeEnvelope)),
                  (w.panningEnvelope = d(w.panningEnvelope));
              }
            } catch (a) {}
            if (((k += w.headerSize), b.goto(k), 0 === w.numberOfSamples)) {
              var y = K();
              w.samples.push(y);
            } else {
              if (b.isEOF(1)) break;
              for (var z = 0; z < w.numberOfSamples; z++)
                (y = K()),
                  (y.length = b.readDWord()),
                  (y.loop.start = b.readDWord()),
                  (y.loop.length = b.readDWord()),
                  (y.volume = b.readUbyte()),
                  (y.finetuneX = b.readByte()),
                  (y.type = b.readUbyte()),
                  (y.panning = b.readUbyte() - 128),
                  (y.relativeNote = b.readByte()),
                  (y.reserved = b.readByte()),
                  (y.name = b.readString(22)),
                  (y.bits = 8),
                  w.samples.push(y),
                  (k += w.sampleHeaderSize),
                  b.goto(k);
              for (z = 0; z < w.numberOfSamples; z++)
                if (((y = w.samples[z]), y.length)) {
                  (k += y.length),
                    16 & y.type &&
                      ((y.bits = 16),
                      (y.type ^= 16),
                      (y.length >>= 1),
                      (y.loop.start >>= 1),
                      (y.loop.length >>= 1)),
                    (y.loop.type = y.type || 0),
                    (y.loop.enabled = !!y.loop.type);
                  var A = y.length,
                    B = 0;
                  if (16 === y.bits)
                    for (var C = 0; C < A; C++) {
                      var E = b.readShort() + B;
                      E < -32768 ? (E += 65536) : E > 32767 && (E -= 65536),
                        (B = E),
                        y.data.push(E / 32768);
                    }
                  else
                    for (C = 0; C < A; C++)
                      (E = b.readByte() + B),
                        E < -128 ? (E += 256) : E > 127 && (E -= 256),
                        (B = E),
                        y.data.push(E / 127);
                  if (y.loop.type === l.PINGPONG) {
                    var F = y.data.slice(y.loop.start, y.loop.start + y.loop.length);
                    (y.data = y.data.slice(0, y.loop.start + y.loop.length)),
                      (y.data = y.data.concat(F.reverse())),
                      (y.loop.length = 2 * y.loop.length),
                      (y.length = y.loop.start + y.loop.length);
                  }
                  b.goto(k);
                }
            }
            w.setSampleIndex(0),
              D.setInstrument(j, w),
              u.push({ label: j + ' ' + w.name, data: j });
          }
          return (
            v.trigger(h.instrumentListChange, u),
            (f.instruments = D.getInstruments()),
            D.setBPM(e.defaultBPM),
            D.setAmigaSpeed(e.defaultTempo),
            a.validate(f),
            f
          );
        }),
        (a.write = function (a) {
          var c = D.getSong(),
            d = D.getInstruments(),
            e = D.getTrackCount(),
            f = 'undefined' == typeof versionNumber ? 'dev' : versionNumber,
            g = 0;
          for (k = 0; k < 128; k++) {
            var h = c.patternTable[k] || 0;
            g = Math.max(g, h);
          }
          var i = 336;
          for (k = 0; k <= g; k++) c.patterns[k] && (i += 9 + c.patterns[k].length * e * 5);
          for (k = 1; k < d.length; k++) {
            var j = d[k];
            j && j.hasSamples()
              ? j.samples.forEach(function (a) {
                  var b = a.length;
                  16 === a.bits && (b *= 2), (i += 283 + b);
                })
              : (i += 29);
          }
          var k,
            l = new ArrayBuffer(i),
            m = new b(l, !1);
          for (
            m.writeStringSection('Extended Module: ', 17),
              m.writeStringSection(c.title, 20),
              m.writeByte(26),
              m.writeStringSection('BassoonTracker ' + f, 20),
              m.writeByte(4),
              m.writeByte(1),
              m.writeDWord(276),
              m.writeWord(c.length),
              m.writeWord(0),
              m.writeWord(D.getTrackCount()),
              m.writeWord(g + 1),
              m.writeWord(d.length - 1),
              m.writeWord(D.useLinearFrequency ? 1 : 0),
              m.writeWord(D.getAmigaSpeed()),
              m.writeWord(D.getBPM()),
              k = 0;
            k < 256;
            k++
          )
            m.writeUByte(c.patternTable[k] || 0);
          for (k = 0; k <= g; k++) {
            var n = c.patterns[k],
              o = 0,
              p = 0;
            if (
              (n && ((o = n.length), (p = o * e * 5)),
              m.writeDWord(9),
              m.writeUByte(0),
              m.writeWord(o),
              m.writeWord(p),
              n)
            )
              for (var q = 0, r = n.length; q < r; q++)
                for (var s = n[q], t = 0; t < e; t++) {
                  var u = s[t] || {};
                  m.writeUByte(u.index || 0),
                    m.writeUByte(u.instrument || 0),
                    m.writeUByte(u.volumeEffect || 0),
                    m.writeUByte(u.effect || 0),
                    m.writeUByte(u.param || 0);
                }
          }
          for (k = 1; k < d.length; k++)
            if (((j = d[k]), j && j.hasSamples())) {
              (j.numberOfSamples = j.samples.length),
                m.writeDWord(243),
                m.writeStringSection(j.name, 22),
                m.writeUByte(0),
                m.writeWord(j.numberOfSamples);
              var v =
                  (j.volumeEnvelope.enabled ? 1 : 0) +
                  (j.volumeEnvelope.sustain ? 2 : 0) +
                  (j.volumeEnvelope.loop ? 4 : 0),
                w =
                  (j.panningEnvelope.enabled ? 1 : 0) +
                  (j.panningEnvelope.sustain ? 2 : 0) +
                  (j.panningEnvelope.loop ? 4 : 0);
              m.writeDWord(40);
              for (var x = 0; x < 96; x++) m.writeUByte(j.sampleNumberForNotes[x] || 0);
              for (x = 0; x < 12; x++) {
                var y = j.volumeEnvelope.points[x] || [0, 0];
                m.writeWord(y[0]), m.writeWord(y[1]);
              }
              for (x = 0; x < 12; x++)
                (y = j.panningEnvelope.points[x] || [0, 0]), m.writeWord(y[0]), m.writeWord(y[1]);
              m.writeUByte(j.volumeEnvelope.count || 0),
                m.writeUByte(j.panningEnvelope.count || 0),
                m.writeUByte(j.volumeEnvelope.sustainPoint || 0),
                m.writeUByte(j.volumeEnvelope.loopStartPoint || 0),
                m.writeUByte(j.volumeEnvelope.loopEndPoint || 0),
                m.writeUByte(j.panningEnvelope.sustainPoint || 0),
                m.writeUByte(j.panningEnvelope.loopStartPoint || 0),
                m.writeUByte(j.panningEnvelope.loopEndPoint || 0),
                m.writeUByte(v),
                m.writeUByte(w),
                m.writeUByte(j.vibrato.type || 0),
                m.writeUByte(j.vibrato.sweep || 0),
                m.writeUByte(j.vibrato.depth || 0),
                m.writeUByte(j.vibrato.rate || 0),
                m.writeWord(j.fadeout || 0),
                m.writeWord(0);
              for (var z = 0; z < j.numberOfSamples; z++) {
                var A = j.samples[z],
                  B = 0;
                A.loop.length > 2 && A.loop.enabled && (B = 1);
                var C = A.length,
                  E = A.loop.start,
                  F = A.loop.length;
                16 === A.bits && ((B += 16), (C *= 2), (E *= 2), (F *= 2)),
                  m.writeDWord(C),
                  m.writeDWord(E),
                  m.writeDWord(F),
                  m.writeUByte(A.volume),
                  m.writeByte(A.finetuneX),
                  m.writeUByte(B),
                  m.writeUByte((A.panning || 0) + 128),
                  m.writeUByte(A.relativeNote || 0),
                  m.writeUByte(0),
                  m.writeStringSection(A.name || '', 22);
              }
              for (z = 0; z < j.numberOfSamples; z++) {
                A = j.samples[z];
                var G,
                  H = 0,
                  I = 0;
                if (16 === A.bits)
                  for (x = 0, r = A.length; x < r; x++)
                    (G = Math.round(32768 * A.data[x])),
                      (H = G - I),
                      (I = G),
                      H < -32768 ? (H += 65536) : H > 32767 && (H -= 65536),
                      m.writeWord(H);
                else
                  for (x = 0, r = A.length; x < r; x++)
                    (G = Math.round(127 * A.data[x])),
                      (H = G - I),
                      (I = G),
                      H < -128 ? (H += 256) : H > 127 && (H -= 256),
                      m.writeByte(H);
              }
            } else
              m.writeDWord(29),
                m.writeStringSection(j ? j.name : '', 22),
                m.writeUByte(0),
                m.writeWord(0);
          a && a(m);
        }),
        (a.validate = function (a) {
          function b(a, b) {
            var c = !0;
            if (a.points && a.points[0])
              if (0 === a.points[0][0])
                for (var d = 0, e = 1; e < a.count; e++) {
                  var f = a.points[e];
                  f && f[0] > d ? (d = f[0]) : (c = !1);
                }
              else c = !1;
            else c = !1;
            return c
              ? a
              : 'volume' === b
              ? {
                  raw: [],
                  enabled: !1,
                  points: [
                    [0, 48],
                    [10, 64],
                    [20, 40],
                    [30, 18],
                    [40, 28],
                    [50, 18],
                  ],
                  count: 6,
                }
              : {
                  raw: [],
                  enabled: !1,
                  points: [
                    [0, 32],
                    [20, 40],
                    [40, 24],
                    [60, 32],
                    [80, 32],
                  ],
                  count: 5,
                };
          }
          a.instruments.forEach(function (a) {
            (a.volumeEnvelope = b(a.volumeEnvelope, 'volume')),
              (a.panningEnvelope = b(a.panningEnvelope, 'panning'));
            for (var c = a.samples.length - 1, d = 0, e = a.sampleNumberForNotes.length; d < e; d++)
              a.sampleNumberForNotes[d] = Math.min(a.sampleNumberForNotes[d], c);
          });
        }),
        a
      );
    },
    J = function () {
      function a(a, c, d) {
        var e = D.getProperties().tickTime,
          f = a.sustain ? a.sustainPoint + 1 : a.count;
        (a.loopStartPoint = Math.min(a.loopStartPoint, a.count - 1)),
          (a.loopEndPoint = Math.min(a.loopEndPoint, a.count - 1));
        var g = a.loop && a.loopStartPoint < a.loopEndPoint;
        a.sustain && a.sustainPoint <= a.loopStartPoint && (g = !1), g && (f = a.loopEndPoint + 1);
        var h = 0,
          i = 0;
        if (c.gain)
          var j = c.gain,
            k = 0,
            l = 64;
        else (j = c.pan), (k = 32), (l = 32);
        j.setValueAtTime((a.points[0][1] - k) / l, d);
        for (var m = 1; m < f; m++) {
          var n = a.points[m];
          (i = n[0]), (h = i * e), j.linearRampToValueAtTime((n[1] - k) / l, d + h);
        }
        return !!g && b.scheduleEnvelopeLoop(c, d, 2, h);
      }
      var b = {};
      return (
        (b.type = 'sample'),
        (b.name = ''),
        (b.instrumentIndex = 0),
        (b.sampleIndex = -1),
        (b.fadeout = 128),
        (b.data = []),
        (b.samples = [K()]),
        (b.sample = b.samples[0]),
        (b.volumeEnvelope = {
          raw: [],
          enabled: !1,
          points: [
            [0, 48],
            [10, 64],
            [20, 40],
            [30, 18],
            [40, 28],
            [50, 18],
          ],
          count: 6,
        }),
        (b.panningEnvelope = {
          raw: [],
          enabled: !1,
          points: [
            [0, 32],
            [20, 40],
            [40, 24],
            [60, 32],
            [80, 32],
          ],
          count: 5,
        }),
        (b.vibrato = {}),
        (b.sampleNumberForNotes = []),
        (b.play = function (a, c, d, e, f, g) {
          return (
            D.inFTMode() && (c = b.getPeriodForNote(a)),
            w.playSample(b.instrumentIndex, c, d, e, f, g, a)
          );
        }),
        (b.noteOn = function (c) {
          var d,
            e,
            f = {};
          if (b.volumeEnvelope.enabled) {
            d = w.context.createGain();
            var g = b.volumeEnvelope,
              h = a(g, d, c);
            h && (f.volume = c + h);
          }
          return (
            b.panningEnvelope.enabled &&
              w.usePanning &&
              ((e = w.context.createStereoPanner()),
              (g = b.panningEnvelope),
              (h = a(g, e, c)),
              h && (f.panning = c + h)),
            b.vibrato.rate &&
              b.vibrato.depth &&
              ((f.ticks = 0), (f.vibrato = c), (f.vibratoFunction = b.getAutoVibratoFunction())),
            { volume: d, panning: e, scheduled: f }
          );
        }),
        (b.noteOff = function (a, c) {
          function d() {
            c.volume.gain.cancelScheduledValues(a),
              c.volumeFadeOut.gain.cancelScheduledValues(a),
              c.volumeEnvelope && c.volumeEnvelope.gain.cancelScheduledValues(a),
              c.panningEnvelope && c.panningEnvelope.pan.cancelScheduledValues(a),
              (c.scheduled = void 0);
          }
          if (c && c.volume) {
            if (D.inFTMode()) {
              var e = D.getProperties().tickTime;
              if (b.volumeEnvelope.enabled) {
                if (b.volumeEnvelope.sustain && c.volumeEnvelope) {
                  d();
                  var f = 0,
                    g = b.volumeEnvelope.points[b.volumeEnvelope.sustainPoint];
                  g && (f = g[0] * e);
                  for (var h = b.volumeEnvelope.sustainPoint; h < b.volumeEnvelope.count; h++) {
                    var i = b.volumeEnvelope.points[h];
                    i && c.volumeEnvelope.gain.linearRampToValueAtTime(i[1] / 64, a + i[0] * e - f);
                  }
                }
                if (b.fadeout) {
                  var j = ((65536 / b.fadeout) * e) / 2;
                  c.volumeFadeOut.gain.linearRampToValueAtTime(0, a + j);
                }
              } else d(), c.volumeFadeOut.gain.linearRampToValueAtTime(0, a + 0.1);
              if (b.panningEnvelope.enabled && w.usePanning && c.panningEnvelope)
                for (
                  f = 0,
                    g = b.panningEnvelope.points[b.panningEnvelope.sustainPoint],
                    g && (f = g[0] * e),
                    h = b.panningEnvelope.sustainPoint;
                  h < b.panningEnvelope.count;
                  h++
                )
                  (i = b.panningEnvelope.points[h]),
                    i &&
                      c.panningEnvelope.pan.linearRampToValueAtTime(
                        (i[1] - 32) / 32,
                        a + i[0] * e - f,
                      );
              return 100;
            }
            return (
              d(), c.isKey && c.volume ? void c.volume.gain.linearRampToValueAtTime(0, a + 0.5) : 0
            );
          }
        }),
        (b.scheduleEnvelopeLoop = function (a, c, d, e) {
          e = e || 0;
          var f = D.getProperties().tickTime;
          if (a.gain)
            var g = b.volumeEnvelope,
              h = a.gain,
              i = 0,
              j = 64;
          else (g = b.panningEnvelope), (h = a.pan), (i = 32), (j = 32);
          var k = g.points[g.loopStartPoint],
            l = k[0],
            m = g.loop && g.loopStartPoint < g.loopEndPoint;
          if (m)
            for (; e < d; )
              for (var n = e, o = g.loopStartPoint; o <= g.loopEndPoint; o++)
                (k = g.points[o]),
                  (e = n + (k[0] - l) * f),
                  h.linearRampToValueAtTime((k[1] - i) / j, c + e);
          return e;
        }),
        (b.scheduleAutoVibrato = function (a, c) {
          var d = 0;
          a.scheduled.ticks = a.scheduled.ticks || 0;
          var e = D.getProperties().tickTime,
            f = -b.vibrato.rate / 40,
            g = b.vibrato.depth / 8;
          D.useLinearFrequency && (g *= 4);
          var h, i, j, k;
          for (
            a.source &&
            ((h = a.startPeriod),
            (i = a.scheduled.vibratoFunction || w.waveFormFunction.sine),
            (j = a.scheduled.vibrato || w.context.currentTime),
            (k = 0));
            d < c;

          ) {
            if (((d += e), h)) {
              var l = 1;
              b.vibrato.sweep &&
                a.scheduled.ticks < b.vibrato.sweep &&
                (l = 1 - (b.vibrato.sweep - a.scheduled.ticks) / b.vibrato.sweep);
              var m = i(h, a.scheduled.ticks, f, g * l);
              D.setPeriodAtTime(a, m, j + k * e), k++;
            }
            a.scheduled.ticks++;
          }
          return d;
        }),
        (b.getAutoVibratoFunction = function () {
          switch (b.vibrato.type) {
            case 1:
              return w.waveFormFunction.square;
            case 2:
              return w.waveFormFunction.saw;
            case 3:
              return w.waveFormFunction.sawInverse;
          }
          return w.waveFormFunction.sine;
        }),
        (b.resetVolume = function (a, c) {
          if (
            (c.volumeFadeOut &&
              (c.volumeFadeOut.gain.cancelScheduledValues(a),
              c.volumeFadeOut.gain.setValueAtTime(1, a)),
            c.volumeEnvelope)
          ) {
            c.volumeEnvelope.gain.cancelScheduledValues(a);
            var d = D.getProperties().tickTime,
              e = b.volumeEnvelope.sustain
                ? b.volumeEnvelope.sustainPoint + 1
                : b.volumeEnvelope.count;
            c.volumeEnvelope.gain.setValueAtTime(b.volumeEnvelope.points[0][1] / 64, a);
            for (var f = 1; f < e; f++) {
              var g = b.volumeEnvelope.points[f];
              c.volumeEnvelope.gain.linearRampToValueAtTime(g[1] / 64, a + g[0] * d);
            }
          }
        }),
        (b.getFineTune = function () {
          return D.inFTMode() ? b.sample.finetuneX : b.sample.finetune;
        }),
        (b.setFineTune = function (a) {
          D.inFTMode()
            ? ((b.sample.finetuneX = a), (b.sample.finetune = a >> 4))
            : (a > 7 && (a -= 15), (b.sample.finetune = a), (b.sample.finetuneX = a << 4));
        }),
        (b.getPeriodForNote = function (a, c) {
          var d = 0;
          return (
            D.useLinearFrequency
              ? ((d = 7680 - 64 * (a - 1)), c && (d -= b.getFineTune() / 2))
              : ((d = B[a].period),
                c && b.getFineTune() && (d = w.getFineTuneForNote(a, b.getFineTune()))),
            d
          );
        }),
        (b.setSampleForNoteIndex = function (a) {
          var c = b.sampleNumberForNotes[a - 1];
          c !== b.sampleIndex && 'number' == typeof c && b.setSampleIndex(c);
        }),
        (b.setSampleIndex = function (a) {
          b.sampleIndex !== a &&
            ((b.sample = b.samples[a]),
            (b.sampleIndex = a),
            v.trigger(h.sampleIndexChange, b.instrumentIndex));
        }),
        (b.hasSamples = function () {
          for (var a = 0, c = b.samples.length; a < c; a++) if (b.samples[a].length) return !0;
        }),
        (b.hasVibrato = function () {
          return b.vibrato.rate && b.vibrato.depth;
        }),
        b
      );
    },
    K = function () {
      var a = {};
      return (
        (a.data = []),
        (a.length = 0),
        (a.name = ''),
        (a.bits = 8),
        (a.volume = 64),
        (a.finetune = 0),
        (a.finetuneX = 0),
        (a.panning = 0),
        (a.relativeNote = 0),
        (a.loop = { enabled: !1, start: 0, length: 0, type: 0 }),
        (a.check = function () {
          for (var b = 0, c = 0, d = 0, e = a.data.length; d < e; d++)
            (b = Math.min(b, a.data[d])), (c = Math.max(c, a.data[d]));
          return { min: b, max: c };
        }),
        a
      );
    },
    L = function () {
      var a = {};
      return (
        (a.period = 0),
        (a.index = 0),
        (a.effect = 0),
        (a.instrument = 0),
        (a.param = 0),
        (a.volumeEffect = 0),
        (a.setPeriod = function (b) {
          (a.period = b), (a.index = C[b] || 0);
        }),
        (a.setIndex = function (b) {
          a.index = b;
          var c = B[b];
          c
            ? ((a.period = c.modPeriod || c.period), 1 === a.period && (a.period = 0))
            : (a.period = 0);
        }),
        (a.clear = function () {
          (a.instrument = 0),
            (a.period = 0),
            (a.effect = 0),
            (a.param = 0),
            (a.index = 0),
            (a.volumeEffect = 0);
        }),
        (a.duplicate = function () {
          return {
            instrument: a.instrument,
            period: a.period,
            effect: a.effect,
            param: a.param,
            volumeEffect: a.volumeEffect,
            note: a.index,
          };
        }),
        (a.populate = function (b) {
          (a.instrument = b.instrument || 0),
            (a.period = b.period || 0),
            (a.effect = b.effect || 0),
            (a.param = b.param || 0),
            (a.volumeEffect = b.volumeEffect || 0),
            (a.index = b.note || b.index || 0);
        }),
        a
      );
    };
  return {
    init: D.init,
    load: D.load,
    playSong: D.playSong,
    stop: D.stop,
    togglePlay: D.togglePlay,
    isPlaying: D.isPlaying,
    getTrackCount: D.getTrackCount,
    getSong: D.getSong,
    getStateAtTime: D.getStateAtTime,
    setCurrentSongPosition: D.setCurrentSongPosition,
    audio: w,
  };
})();

window.BassoonTracker = BassoonTracker;
