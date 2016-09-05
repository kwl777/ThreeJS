			
			
			var camera, scene, renderer, controls;

			// Setup
			function init() {

				camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 100, 1000 );

				// Render three.js world

				scene = new THREE.Scene();

				// Choose a random cuebmap ('2' or '3')
				var mapId = Math.floor( Math.random() * ( 3 - 2 + 1 ) ) + 2;

				var cube = generateCubeMap( 'Park' + mapId + 'Small', 256 );
				scene.add( cube );

				renderer = new THREE.CSS3DRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.getElementById("quanjingInner").appendChild( renderer.domElement );

				// Add DeviceOrientation Controls
				controls = new DeviceOrientationController( camera, renderer.domElement );
				controls.enableManualDrag=false;
				controls.deviceOrientationManual=true;
				controls.connect();

				//setupControllerEventHandlers( controls );

				window.addEventListener( 'resize', onWindowResize, false );

			}

			// Render loop
			function animate() {

				controls.update();

				renderer.render( scene, camera );

				requestAnimationFrame( animate );

			}

		
			function generateCubeMap( folderName, tileWidth ) {

				var flipAngle  = Math.PI;       // 180 degrees
				var rightAngle = flipAngle / 2; //  90 degrees

				tileWidth = tileWidth || 512;

				var sides = [
					{
						url: 'http://pic7.qiyipic.com/common/20160830/0002.jpg',
						position: [ - tileWidth, 0, 0 ],
						rotation: [ 0, rightAngle, 0 ]
					},
					{
						url: 'http://pic7.qiyipic.com/common/20160830/0002.jpg',
						position: [ tileWidth, 0, 0 ],
						rotation: [ 0, - rightAngle, 0 ]
					},
					{
						url: 'http://pic7.qiyipic.com/common/20160830/0002.jpg',
						position: [ 0, tileWidth, 0 ],
						rotation: [ rightAngle, 0, flipAngle ]
					},
					{
						url: 'http://pic7.qiyipic.com/common/20160830/0002.jpg',
						position: [ 0, - tileWidth, 0 ],
						rotation: [ - rightAngle, 0, flipAngle ]
					},
					{
						url: 'http://pic7.qiyipic.com/common/20160830/0002.jpg',
						position: [ 0, 0, tileWidth ],
						rotation: [ 0, flipAngle, 0 ]
					},
					{
						url: 'http://pic4.qiyipic.com/common/20160830/0001.jpg',
						position: [ 0, 0, - tileWidth ],
						rotation: [ 0, 0, 0 ]
					}
				];

				var cube = new THREE.Object3D();

				for ( var i = 0; i < sides.length; i ++ ) {

					var side = sides[ i ];

					var element = document.createElement( 'div' );
					element.style.width = tileWidth * 2 + 2+'px'; // 2 pixels extra to close the gap.
					element.style.height = tileWidth * 2 + 2+'px';
					element.style.backgroundImage = "url("+side.url+")";
					element.style.backgroundSize="cover";
					element.id="section_"+i;

					var object = new THREE.CSS3DObject( element );
					object.position.fromArray( side.position );
					object.rotation.fromArray( side.rotation );
					cube.add( object );

				}

				return cube;

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;

				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}
			function add() {
			$("#section_0").append("<div class='star1 s1'></div><div class='star1 s2'></div><div class='star1 s3'></div><div class='star1 s4'></div><div class='star1 s5'></div><div class='button_ball ball1'><div class='ball' data-seq='0'><img src='http://pic1.qiyipic.com/common/20160830/sjzgxpage2-tkyxz.png' class='ball-qq'></div></div><div class='button_ball ball2'><div class='ball' data-seq='1'><img src='http://pic8.qiyipic.com/common/20160830/sjzgx-con3.png' class='ball-qq'></div></div>");
			$("#section_1").append("<div class='star1 s1'></div><div class='star1 s2'></div><div class='star1 s3'></div><div class='star1 s4'></div><div class='star1 s5'></div><div class='button_ball ball3'><div class='ball' data-seq='2'><img src='http://pic9.qiyipic.com/common/20160830/sjzgxpage2-sjkxx.png' class='ball-qq'></div></div>")
			$("#section_2").append("<div class='button_ball iqyball'><div class='ball'><img src='http://pic0.qiyipic.com/common/20160902/tgeh-iqyqiu.png' class='ball-qq'></div></div>")
			$("#section_3").append("<div class='button_ball iqyball'><div class='ball'><img src='http://pic0.qiyipic.com/common/20160902/tgeh-iqyqiu.png' class='ball-qq'></div></div>");
			$("#section_4").append("<div class='star1 s1'></div><div class='star1 s2'></div><div class='star1 s3'></div><div class='star1 s4'></div><div class='star1 s5'></div><div class='button_ball ball5'><div class='weixin'></div><div class='ball' data-seq='3'><img src='http://pic1.qiyipic.com/common/20160830/sjzgxpage2-earth.png' class='ball-qq'></div></div>");
			$("#section_5").append("<canvas class='f-lc-star'></canvas><div class='button_ball ball4'><div class='ball' data-seq='4'><img src='http://pic8.qiyipic.com/common/20160830/sjzgxpage2-qjdsy.png' class='ball-qq'></div></div><div class='button_ball ball6'><div class='ball' data-seq='5'><img src='http://pic6.qiyipic.com/common/20160830/sjzgxpage2-zxzqy.png' class='ball-qq'></div></div>")
		}
			init();

			animate();
			add();
			$(".clock").on('tap',function(){
				$(this).toggleClass("on");
				controls.enableManualDrag=!controls.enableManualDrag;
				controls.deviceOrientationManual=!controls.deviceOrientationManual;
			});
			iqyworld.stars({
		        canvas : $(".f-lc-star"),
		        clientWidth : $(window).width(),
		        clientHeight : 1200,
		        starNum : 300,
		        starDepth : 500
		    });