uniform sampler2D texture;
uniform float opacity;
varying vec3 vNormal;

varying vec2 vUv;

void main() {
  vec3 diffuse = texture2D( texture, vUv ).xyz;
  diffuse.x += 0.0;
  diffuse.z += 0.1;
  gl_FragColor = vec4(diffuse, opacity);    
}