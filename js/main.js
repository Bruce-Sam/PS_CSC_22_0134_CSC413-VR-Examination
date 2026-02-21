// ================= AUDIO UNLOCK & PLAY =================
window.addEventListener('click', function () {
    const sceneEl = document.querySelector('a-scene');
  
    if (sceneEl.audioListener &&
        sceneEl.audioListener.context.state === 'suspended') {
      sceneEl.audioListener.context.resume();
    }
  
    const tvEntity = document.querySelector('#tv-audio-source');
    if (tvEntity) tvEntity.components.sound.playSound();
  
    const dogEntity = document.querySelector('#dog-audio');
    if (dogEntity) dogEntity.components.sound.playSound();
  
    const poolEntity = document.querySelector('#pool-audio');
    if (poolEntity) poolEntity.components.sound.playSound();
  
    const video = document.querySelector('#movie-src');
    if (video) {
      video.muted = false;
      video.play();
    }
  }, { once: true });
  
  
  // ================= DOG PATROL COMPONENT =================
  AFRAME.registerComponent('patrol', {
    init: function () {
      this.movingForward = true;
  
      this.el.addEventListener('animationcomplete', () => {
        if (this.movingForward) {
          this.el.setAttribute('rotation', '0 0 0');
          this.el.setAttribute('animation', {
            property: 'position',
            from: '17 0 -10',
            to: '17 0 20',
            dur: 10000,
            easing: 'linear',
            loop: false
          });
        } else {
          this.el.setAttribute('rotation', '0 180 0');
          this.el.setAttribute('animation', {
            property: 'position',
            from: '17 0 20',
            to: '17 0 -10',
            dur: 10000,
            easing: 'linear',
            loop: false
          });
        }
  
        this.movingForward = !this.movingForward;
      });
    }
  });
  
  
  // ================= WATER FLOW COMPONENT =================
  AFRAME.registerComponent('water-flow', {
    schema: {
      speedX: { type: 'number', default: 0.1 },
      speedY: { type: 'number', default: 0.2 }
    },
  
    init: function () {
      this.initialized = false;
    },
  
    tick: function (time, timeDelta) {
      const mesh = this.el.getObject3D('mesh');
      if (!mesh || !mesh.material || !mesh.material.map) return;
  
      if (!this.initialized) {
        mesh.material.map.wrapS = THREE.RepeatWrapping;
        mesh.material.map.wrapT = THREE.RepeatWrapping;
        mesh.material.transparent = true;
        this.initialized = true;
      }
  
      const delta = timeDelta / 1000;
      mesh.material.map.offset.x += this.data.speedX * delta;
      mesh.material.map.offset.y += this.data.speedY * delta;
    }
  });