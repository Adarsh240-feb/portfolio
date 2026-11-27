import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Procedural studio softbox environment so the glossy red ABS plastic
 * catches realistic highlights along the 45-degree chamfers and grip bevels.
 */
const StudioEnvironment = () => {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envTarget = pmrem.fromScene(roomEnv, 0.045);

    scene.environment = envTarget.texture;
    if ('environmentIntensity' in scene) {
      scene.environmentIntensity = 0.26;
    }

    return () => {
      scene.environment = null;
      envTarget.dispose();
      roomEnv.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
};

/**
 * Subtle micro-grain bump texture to emulate real injection-molded ABS plastic.
 */
function createAbsGrainTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 120 + Math.floor(Math.random() * 24);
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 5);
  tex.needsUpdate = true;
  return tex;
}

/**
 * High-DPI transparent decal texture for the white "PORTFOLIO" screen-print
 * and 4 subtle recessed pinhole screw marks directly on the red body.
 */
function createPortfolioDecalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Subtle recessed pinhole screws (2 above, 2 below) matching reference placement
    const holes = [
      [295, 52],
      [755, 52],
      [295, 308],
      [755, 308],
    ];
    holes.forEach(([hx, hy]) => {
      ctx.beginPath();
      ctx.arc(hx, hy, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(32, 2, 2, 0.72)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(hx, hy, 7.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 120, 110, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Fit crisp off-white screen-printed wordmark safely within 82% width
    ctx.fillStyle = '#F7F3EE';
    let fontSize = 140;
    do {
      ctx.font = `800 ${fontSize}px "Bricolage Grotesque", "Segoe UI", Arial, sans-serif`;
      fontSize -= 4;
    } while (ctx.measureText('PORTFOLIO').width > 820 && fontSize > 80);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PORTFOLIO', canvas.width / 2, canvas.height / 2 + 4);
    texture.needsUpdate = true;
  };

  draw();
  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(draw).catch(() => {});
  }

  return texture;
}

/**
 * Soft diffused drop shadow texture beneath the gun.
 */
function createShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 16, 128, 128, 122);
  grad.addColorStop(0, 'rgba(25, 14, 12, 0.24)');
  grad.addColorStop(0.5, 'rgba(25, 14, 12, 0.1)');
  grad.addColorStop(1, 'rgba(25, 14, 12, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Chunky 45-degree chamfered upper body matching the iconic Cash Cannon block.
 */
function createChamferedBodyGeo() {
  const w = 2.74;
  const h = 0.88;
  const s = new THREE.Shape();
  s.moveTo(-w / 2, -h / 2);
  s.lineTo(w / 2, -h / 2);
  s.lineTo(w / 2, h / 2);
  s.lineTo(-w / 2, h / 2);
  s.closePath();

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.56,
    bevelEnabled: true,
    bevelThickness: 0.16,
    bevelSize: 0.15,
    bevelSegments: 1,
  });
  geo.translate(0, 0, -0.28);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Sculpted angled red pistol grip with soft rounded corners and bevel highlight.
 */
function createGripGeo() {
  const s = new THREE.Shape();
  s.moveTo(0.24, -0.42);
  s.lineTo(1.02, -0.42);
  s.lineTo(1.32, -1.52);
  s.quadraticCurveTo(1.34, -1.64, 1.2, -1.64);
  s.lineTo(0.68, -1.64);
  s.quadraticCurveTo(0.56, -1.64, 0.53, -1.52);
  s.closePath();

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.44,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.07,
    bevelSegments: 4,
    curveSegments: 20,
  });
  geo.translate(0, 0, -0.22);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Smooth U-shaped red trigger guard joining barrel belly to front grip.
 */
function createTriggerGuardGeo() {
  const outer = new THREE.Shape();
  outer.moveTo(-0.34, -0.48);
  outer.lineTo(-0.2, -0.48);
  outer.lineTo(-0.12, -0.94);
  outer.quadraticCurveTo(-0.08, -1.07, 0.09, -1.07);
  outer.lineTo(0.56, -1.02);
  outer.lineTo(0.54, -1.16);
  outer.lineTo(0.05, -1.21);
  outer.quadraticCurveTo(-0.22, -1.21, -0.26, -0.96);
  outer.closePath();

  const geo = new THREE.ExtrudeGeometry(outer, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.02,
    bevelSegments: 4,
    curveSegments: 24,
  });
  geo.translate(0, 0, -0.08);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Curved molded trigger inside the guard loop.
 */
function createTriggerGeo() {
  const s = new THREE.Shape();
  s.moveTo(-0.04, 0.02);
  s.lineTo(0.11, 0.02);
  s.quadraticCurveTo(0.14, -0.24, 0.34, -0.34);
  s.lineTo(0.24, -0.42);
  s.quadraticCurveTo(-0.02, -0.27, -0.04, 0.02);

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.11,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.015,
    bevelSegments: 4,
    curveSegments: 20,
  });
  geo.translate(0, 0, -0.055);
  geo.computeVertexNormals();
  return geo;
}

const CashCannonMesh = ({ recoilCounter, isFiring, pointerRef }) => {
  const groupRef = useRef();
  const triggerRef = useRef();
  const shadowRef = useRef();

  const recoilAmount = useRef(0);
  const lastShot = useRef(recoilCounter);

  const bodyGeo = useMemo(() => createChamferedBodyGeo(), []);
  const gripGeo = useMemo(() => createGripGeo(), []);
  const guardGeo = useMemo(() => createTriggerGuardGeo(), []);
  const triggerGeo = useMemo(() => createTriggerGeo(), []);
  const absGrainTex = useMemo(() => createAbsGrainTexture(), []);
  const decalTex = useMemo(() => createPortfolioDecalTexture(), []);
  const shadowTex = useMemo(() => createShadowTexture(), []);

  // Vibrant injection-molded red ABS plastic with micro-grain & clearcoat
  const redPlasticMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#D8100C',
        roughness: 0.28,
        metalness: 0.02,
        clearcoat: 0.62,
        clearcoatRoughness: 0.22,
        bumpMap: absGrainTex,
        bumpScale: 0.004,
      }),
    [absGrainTex]
  );

  // Subtle darker inner shade for the trigger & recessed underside seam
  const redInnerMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#B80C09',
        roughness: 0.32,
        metalness: 0.02,
        clearcoat: 0.45,
        clearcoatRoughness: 0.25,
      }),
    []
  );

  // Deep recessed ejection mouth cavity
  const darkSlotMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#150202',
        roughness: 0.88,
        metalness: 0.05,
      }),
    []
  );

  useEffect(() => {
    return () => {
      bodyGeo.dispose();
      gripGeo.dispose();
      guardGeo.dispose();
      triggerGeo.dispose();
      absGrainTex.dispose();
      decalTex.dispose();
      shadowTex.dispose();
    };
  }, [
    bodyGeo,
    gripGeo,
    guardGeo,
    triggerGeo,
    absGrainTex,
    decalTex,
    shadowTex,
  ]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (recoilCounter !== lastShot.current) {
      lastShot.current = recoilCounter;
      recoilAmount.current = 1;
    }

    recoilAmount.current = THREE.MathUtils.lerp(
      recoilAmount.current,
      0,
      Math.min(1, delta * 15)
    );

    const t = state.clock.elapsedTime;
    const floatY = Math.sin(t * 1.9) * 0.055;
    const floatRotZ = Math.cos(t * 1.4) * 0.018;

    const px = pointerRef?.current?.x || 0;
    const py = pointerRef?.current?.y || 0;

    // Positive Y rotation (+0.18) turns the front-left muzzle toward the camera
    // so both the dark front ejection slot AND top/right chamfers are visible!
    groupRef.current.position.x = recoilAmount.current * 0.2;
    groupRef.current.position.y = floatY + recoilAmount.current * 0.055 + 0.16;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      0.16 + px * 0.18,
      Math.min(1, delta * 6)
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.16 + py * 0.11,
      Math.min(1, delta * 6)
    );
    groupRef.current.rotation.z =
      0.26 + floatRotZ - recoilAmount.current * 0.13;

    if (triggerRef.current) {
      const targetRot = isFiring ? 0.34 : 0;
      triggerRef.current.rotation.z = THREE.MathUtils.lerp(
        triggerRef.current.rotation.z,
        targetRot,
        Math.min(1, delta * 18)
      );
    }

    if (shadowRef.current) {
      shadowRef.current.position.x = groupRef.current.position.x + 0.12;
      const s = 1 - floatY * 0.35;
      shadowRef.current.scale.set(s, s, 1);
    }
  });

  // Outer side face Z = 0.28 (half depth) + 0.16 (bevelThickness) = 0.44
  const faceZ = 0.442;

  return (
    <group>
      <group ref={groupRef} scale={1.12}>
        {/* Main Faceted Chamfered Red Body */}
        <mesh geometry={bodyGeo} material={redPlasticMat} castShadow receiveShadow />

        {/* Angled All-Red Pistol Grip (receives shadow from overhanging barrel) */}
        <mesh geometry={gripGeo} material={redPlasticMat} castShadow receiveShadow />

        {/* Red U-Shaped Trigger Guard */}
        <mesh geometry={guardGeo} material={redPlasticMat} castShadow receiveShadow />

        {/* Curved Red Trigger */}
        <group ref={triggerRef} position={[0.04, -0.52, 0]}>
          <mesh geometry={triggerGeo} material={redInnerMat} castShadow receiveShadow />
        </group>

        {/* Front-Left Dark Vertical Ejection Slot (cleanly flush in front face) */}
        <mesh position={[-1.505, -0.01, 0]} material={darkSlotMat}>
          <boxGeometry args={[0.036, 0.64, 0.24]} />
        </mesh>

        {/* Subtle Dark Top Feed Slit */}
        <mesh position={[0.08, 0.592, 0]} material={darkSlotMat}>
          <boxGeometry args={[1.38, 0.014, 0.16]} />
        </mesh>

        {/* Crisp White "PORTFOLIO" Printed Directly on Both Red Sides */}
        <mesh position={[0, 0, faceZ]}>
          <planeGeometry args={[2.62, 0.86]} />
          <meshStandardMaterial
            map={decalTex}
            transparent
            alphaTest={0.04}
            roughness={0.34}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>

        <mesh position={[0, 0, -faceZ]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2.62, 0.86]} />
          <meshStandardMaterial
            map={decalTex}
            transparent
            alphaTest={0.04}
            roughness={0.34}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>
      </group>

      {/* Soft Contact Shadow underneath */}
      <mesh
        ref={shadowRef}
        position={[0.12, -1.78, -0.25]}
        rotation={[-Math.PI / 2.6, 0, 0]}
      >
        <planeGeometry args={[3.9, 1.85]} />
        <meshBasicMaterial map={shadowTex} transparent depthWrite={false} />
      </mesh>
    </group>
  );
};

const PortfolioGun3D = ({ recoilCounter = 0, isFiring = false }) => {
  const pointerRef = useRef({ x: 0, y: 0 });

  return (
    <div
      className="w-full h-full"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
        };
      }}
      onPointerLeave={() => {
        pointerRef.current = { x: 0, y: 0 };
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [-0.22, 0.32, 4.95], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.02,
          powerPreference: 'high-performance',
        }}
      >
        <StudioEnvironment />
        <ambientLight intensity={0.28} />
        <directionalLight
          position={[1.5, 8.0, 4.2]}
          intensity={2.15}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={16}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
          shadow-bias={-0.0005}
          shadow-normalBias={0.02}
        />
        <directionalLight position={[-5.0, 1.5, 3.0]} intensity={0.55} color="#FFF3EC" />
        <pointLight
          position={[-2.2, 0.1, 1.4]}
          intensity={isFiring ? 3.0 : 0.2}
          color="#C6F432"
        />
        <CashCannonMesh
          recoilCounter={recoilCounter}
          isFiring={isFiring}
          pointerRef={pointerRef}
        />
      </Canvas>
    </div>
  );
};

export default PortfolioGun3D;
