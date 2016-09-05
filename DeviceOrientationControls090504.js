var DeviceOrientationController = function (e, t) {
  this.object = e, this.element = t || document, this.freeze = !0, this.enableManualDrag = !0, this.enableManualZoom = !0, this.deviceOrientationManual = !1, this.useQuaternions = !0, this.deviceOrientation = {}, this.screenOrientation = window.orientation || 0, this.manualDragDirection = -1;
  var i, r, n, o, a, s = 0,
    l = 0,
    h = 0,
    c = 0,
    u = new THREE.Quaternion,
    p = 1,
    d = 1,
    f = new THREE.Vector2,
    m = new THREE.Vector2,
    E = {
      AUTO: 0,
      MANUAL_ROTATE: 1,
      MANUAL_ZOOM: 2
    }, g = E.AUTO,
    v = {
      CALIBRATE_COMPASS: "compassneedscalibration",
      SCREEN_ORIENTATION: "orientationchange",
      MANUAL_CONTROL: "userinteraction",
      ZOOM_CONTROL: "zoom",
      ROTATE_CONTROL: "rotate"
    }, y = window.innerHeight,
    T = 2e3 * Math.tan(THREE.Math.degToRad((this.object.fov || 75) / 2)),
    x = new THREE.Quaternion,
    R = function () {
      var e;
      return function (t) {
        e = arguments || {}, e.type = t, e.target = this, this.dispatchEvent(e)
      }.bind(this)
    }.bind(this)();

  this.constrainObjectFOV = function () {
    o = T * (window.innerHeight / y), a = THREE.Math.radToDeg(2 * Math.atan(o / 2e3)), this.object.fov = a
  }.bind(this), this.onDeviceOrientationChange = function (e) {
    this.deviceOrientationManual === !0 && (this.deviceOrientation = e)
  }.bind(this), this.onScreenOrientationChange = function () {
    this.deviceOrientationManual === !0 && (this.screenOrientation = window.orientation || 0, R(v.SCREEN_ORIENTATION))
  }.bind(this), this.onCompassNeedsCalibration = function (e) {
    this.deviceOrientationManual === !0 && (e.preventDefault(), R(v.CALIBRATE_COMPASS))
  }.bind(this), this.onDocumentMouseDown = function (e) {
    this.enableManualDrag === !0 && (e.preventDefault(), g = E.MANUAL_ROTATE, this.freeze = !0, u.copy(this.object.quaternion), s = h = e.pageX, l = c = e.pageY, i = 1200 / window.innerWidth * .2, r = 800 / window.innerHeight * .2, this.element.addEventListener("mousemove", this.onDocumentMouseMove, !1), this.element.addEventListener("mouseup", this.onDocumentMouseUp, !1), R(v.MANUAL_CONTROL + "start"), R(v.ROTATE_CONTROL + "start"))
  }.bind(this), this.onDocumentMouseMove = function (e) {
    h = e.pageX, c = e.pageY;
  }.bind(this), this.onDocumentMouseUp = function (e) {
    this.element.removeEventListener("mousemove", this.onDocumentMouseMove, !1), this.element.removeEventListener("mouseup", this.onDocumentMouseUp, !1), g = E.AUTO, this.freeze = !1, R(v.MANUAL_CONTROL + "end"), R(v.ROTATE_CONTROL + "end")
  }.bind(this), this.onDocumentTouchStart = function (e) {
    switch (e.preventDefault(), e.touches.length) {
      case 1:
        if (this.enableManualDrag !== !0) return;
        g = E.MANUAL_ROTATE, this.freeze = !0, u.copy(this.object.quaternion), s = h = e.touches[0].pageX, l = c = e.touches[0].pageY, i = 1200 / window.innerWidth * .1, r = 800 / window.innerHeight * .1, this.element.addEventListener("touchmove", this.onDocumentTouchMove, !1), this.element.addEventListener("touchend", this.onDocumentTouchEnd, !1), R(v.MANUAL_CONTROL + "start"), R(v.ROTATE_CONTROL + "start");
        break;
      case 2:
        if (this.enableManualZoom !== !0) return;
        g = E.MANUAL_ZOOM, this.freeze = !0, n = this.object.fov, f.set(e.touches[0].pageX, e.touches[0].pageY), m.set(e.touches[1].pageX, e.touches[1].pageY), p = d = f.distanceTo(m), this.element.addEventListener("touchmove", this.onDocumentTouchMove, !1), this.element.addEventListener("touchend", this.onDocumentTouchEnd, !1), R(v.MANUAL_CONTROL + "start"), R(v.ZOOM_CONTROL + "start")
    }
  }.bind(this), this.onDocumentTouchMove = function (e) {
    switch (e.touches.length) {
      case 1:
        h = e.touches[0].pageX, c = e.touches[0].pageY;
        break;
      case 2:
        f.set(e.touches[0].pageX, e.touches[0].pageY), m.set(e.touches[1].pageX, e.touches[1].pageY)
    }
  }.bind(this), this.onDocumentTouchEnd = function (e) {
    this.element.removeEventListener("touchmove", this.onDocumentTouchMove, !1), this.element.removeEventListener("touchend", this.onDocumentTouchEnd, !1), g === E.MANUAL_ROTATE ? (g = E.AUTO, this.freeze = !1, R(v.MANUAL_CONTROL + "end"), R(v.ROTATE_CONTROL + "end")) : g === E.MANUAL_ZOOM && (this.constrainObjectFOV(), g = E.AUTO, this.freeze = !1, R(v.MANUAL_CONTROL + "end"), R(v.ZOOM_CONTROL + "end"))
  }.bind(this);
  var b = function () {
    var e = new THREE.Quaternion,
      t = new THREE.Euler,
      i = new THREE.Quaternion,
      r = new THREE.Quaternion(-Math.sqrt(.5), 0, 0, Math.sqrt(.5)),
      n = 0;
    return function (o, a, s, l) {
      return t.set(a, o, -s, "YXZ"), e.setFromEuler(t), n = -l / 2, i.set(0, Math.sin(n), 0, Math.cos(n)), e.multiply(i), e.multiply(r), e
    }
  }(),
    H = function () {
      var e = new THREE.Matrix4,
        t = new THREE.Euler,
        i = new THREE.Euler,
        r = new THREE.Euler(-Math.PI / 2, 0, 0, "YXZ"),
        n = new THREE.Matrix4,
        o = new THREE.Matrix4;
      return o.makeRotationFromEuler(r),

      function (r, a, s, l) {
        return t.set(a, r, -s, "YXZ"), e.identity(), e.makeRotationFromEuler(t), i.set(0, -l, 0, "YXZ"), n.identity(), n.makeRotationFromEuler(i), e.multiply(n), e.multiply(o), e
      }
    }();
  this.updateManualMove = function () {
    var e, t, o, a, v, y, T, R, b = new THREE.Euler(0, 0, 0, "YXZ"),
      H = new THREE.Quaternion,
      w = new THREE.Quaternion,
      _ = 1;
    return function () {
      w.copy(u), g === E.MANUAL_ROTATE ? (e = (l - c) * r * this.manualDragDirection, t = (s - h) * i * this.manualDragDirection, o = THREE.Math.degToRad(e), a = THREE.Math.degToRad(t), H.set(0, Math.sin(a / 2), 0, Math.cos(a / 2)), w.multiply(H), H.set(Math.sin(o / 2), 0, 0, Math.cos(o / 2)), w.multiply(H), v = b.setFromQuaternion(u, "YXZ").z, y = b.setFromQuaternion(w, "YXZ").z, T = b.setFromQuaternion(x || u, "YXZ").z, H.set(0, 0, Math.sin((T - v) / 2), Math.cos((T - v) / 2)), u.multiply(H), H.set(0, 0, Math.sin((T - y) / 2), Math.cos((T - y) / 2)), w.multiply(H), this.object.quaternion.copy(w)) : g === E.MANUAL_ZOOM && (d = f.distanceTo(m), R = p / d, _ >= R && (this.object.fov = n * R, this.object.updateProjectionMatrix()), x && (v = b.setFromQuaternion(u, "YXZ").z, T = b.setFromQuaternion(x, "YXZ").z, H.set(0, 0, Math.sin((T - v) / 2), Math.cos((T - v) / 2)), u.multiply(H), this.object.quaternion.copy(u)))
    }
  }(), this.updateDeviceMove = function () {
    var e, t, i, r, n;
    return function () {
      if (e = THREE.Math.degToRad(this.deviceOrientation.alpha || 0), t = THREE.Math.degToRad(this.deviceOrientation.beta || 0), i = THREE.Math.degToRad(this.deviceOrientation.gamma || 0), r = THREE.Math.degToRad(this.screenOrientation || 0), 0 !== e && 0 !== t && 0 !== i) {
        if (this.useQuaternions ? x = b(e, t, i, r) : (n = H(e, t, i, r), x.setFromRotationMatrix(n)), this.freeze) return;
        this.object.quaternion.copy(x)
      }
    }
  }(), this.update = function () {
    this.deviceOrientationManual ? this.updateDeviceMove() : this.updateManualMove()
  }, this.connect = function () {
    window.addEventListener("resize", this.constrainObjectFOV, !1), window.addEventListener("orientationchange", this.onScreenOrientationChange, !1), window.addEventListener("deviceorientation", this.onDeviceOrientationChange, !1), window.addEventListener("compassneedscalibration", this.onCompassNeedsCalibration, !1), this.element.addEventListener("mousedown", this.onDocumentMouseDown, !1), this.element.addEventListener("touchstart", this.onDocumentTouchStart, !1), this.freeze = !1
  }, this.disconnect = function () {
    this.freeze = !0, window.removeEventListener("resize", this.constrainObjectFOV, !1), window.removeEventListener("orientationchange", this.onScreenOrientationChange, !1), window.removeEventListener("deviceorientation", this.onDeviceOrientationChange, !1), window.removeEventListener("compassneedscalibration", this.onCompassNeedsCalibration, !1), this.element.removeEventListener("mousedown", this.onDocumentMouseDown, !1), this.element.removeEventListener("touchstart", this.onDocumentTouchStart, !1)
  }
};
DeviceOrientationController.prototype = Object.create(THREE.EventDispatcher.prototype);
var iqyworld = {
	stars: function(options) {
		var _this = this;
		this.settings = {
			canvas: [],
			clientWidth: $(window).width(),
			clientHeight: $(window).height(),
			starNum: 200,
			starColor: '#FBFFAF',
			starDepth: 500
		};
		$.extend(this.settings, options);
		this.universe_cobj = [];
		for (var i = 0; i < this.settings.canvas.length; i++) {
			this.universe_cobj[i] = this.settings.canvas[i].getContext('2d');
			this.settings.canvas[i].width = _this.settings.clientWidth;
			this.settings.canvas[i].height = _this.settings.clientHeight
		}
		this.stars_setup()
	},
	stars_draw: function(point3d) {
		var scale = this.settings.starDepth / (this.settings.starDepth + point3d[2]);
		var x = (point3d[0] * scale) + this.settings.clientWidth / 2;
		var y = (point3d[1] * scale) + this.settings.clientHeight / 2;
		var r = Math.abs(scale) * 6;
		if (r > 10) {
			r = 15
		}
		for (var i = 0; i < this.settings.canvas.length; i++) {
			this.universe_cobj[i].drawImage(this.universe_yImg, x, y, r, r)
		}
	},
	stars_render: function() {
		for (var i = 0; i < this.settings.canvas.length; i++) {
			this.universe_cobj[i].clearRect(0, 0, this.settings.clientWidth, this.settings.clientHeight)
		}
		for (i = 0; i < this.settings.starNum; i++) {
			var point3d = this.points[i];
			var z = point3d[2];
			z -= 1;
			if (z < -this.settings.starDepth) {
				z += 400
			};
			point3d[2] = z;
			this.stars_draw(point3d)
		}
	},
	stars_setup: function() {
		var _this = this;
		this.points = [];
		for (i = 0; i < _this.settings.starNum; i++) {
			var point = [(Math.random() * 900) - 300, (Math.random() * 1040) - 600, (Math.random() * 900) - 500];
			this.points.push(point)
		}
		this.universe_yImg = new Image();
		this.universe_yImg.src = 'http://pic6.qiyipic.com/common/20160621/ht-star.png';
		this.universe_yImg.onload = function() {
			var loop = setInterval(function() {
				_this.stars_render()
			}, 60)
		}
	},
};
(function($) {
	var qiyiSlider = function(obj, options) {
			this.parent = $("#" + obj);
			if (this.parent.length <= 0) {
				return false
			}
			this.options = $.extend({}, qiyiSlider.options, options);
			this.data = this.parent.find("ul").children("li");
			this.dataLen = this.data.length;
			this.pageNow = 0;
			this.init()
		};
	qiyiSlider.prototype = {
		init: function() {
			if (typeof(options) == 'object') {
				$.extend({}, this.options, options)
			}
			this.content = this.parent.find("ul");
			this.scrollType = this.options.scrollType;
			this.nextBtn = this.parent.parent().find(".next");
			this.prevBtn = this.parent.parent().find(".prev");

			this.callback = this.options.callback;
			var itemWidth = parseInt(this.data.eq(0).width());
			this.totalWidth = itemWidth * this.dataLen;

			// this.content.css({"width":this.totalWidth+"px"});
			this.offsetWidth = parseInt(this.parent.width());
			this.perwidth = itemWidth;
			this.perpage =1;
			this.bind();
		},
		bind: function() {
			var _this = this;
			var path=0;
			_this.prevBtn.on('tap',function(e) {
				e.preventDefault();
				if(path>0){
					path--;
					_this.parent.find("ul").eq(0).animate({
						left: -path*_this.perwidth + 'px'
					})
				}
			});
			_this.nextBtn.on('tap',function(e) {
				e.preventDefault();
				if(path<_this.dataLen-1){
					path++;
					_this.parent.find("ul").eq(0).animate({
						left: -path*_this.perwidth + 'px'
					})
				}
			});
		},
		
	};
	qiyiSlider.options = {
		scrollType: "horizontal",
		direct: "prev",
		autoMove: false,
		delay: 5000,
		speed: 400,
		pager: false
	};
	window.qiyiSlider = qiyiSlider
})(Zepto);
