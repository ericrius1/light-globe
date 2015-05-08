uniform sampler2D texture;
uniform float opacity;
varying vec3 vNormal;

varying vec2 vUv;

void main() {
  vec3 diffuse = texture2D( texture, vUv ).xyz;
  diffuse.x += 0.05;
  diffuse.z += 0.1;
  float intensity = 1.05 - dot(vNormal, vec3(0.0, 0.0, 1.0));
  vec3 atmosphere = vec3(1.0, 1.0, 1.0) * pow(intensity, 3.0);
  gl_FragColor = vec4(diffuse + atmosphere, opacity);    
}