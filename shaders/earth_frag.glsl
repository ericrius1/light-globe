uniform sampler2D texture;
uniform float opacity;
varying vec3 vNormal;

varying vec2 vUv;

void main() {
  vec3 diffuse = texture2D( texture, vUv ).xyz;
  // float finalOpacity = opacity;
  float finalOpacity =  opacity * dot(vNormal, vec3(0.0, 0.0, 1.0));
  diffuse.y += 0.05;
  diffuse.z += 0.1;
  gl_FragColor = vec4(diffuse, finalOpacity);    
}