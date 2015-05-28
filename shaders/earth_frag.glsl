uniform sampler2D texture;
uniform float opacity;
varying vec3 vNormal;
uniform vec3 earthColor;

varying vec2 vUv;

void main() {
  vec3 diffuse = texture2D( texture, vUv ).xyz;
  // float finalOpacity = opacity;
  float finalOpacity =  opacity * dot(vNormal, vec3(0.0, 0.0, 1.0));
  diffuse.x += earthColor.x/2.;
  diffuse.y += earthColor.y/2.;
  diffuse.z += earthColor.z/2.;
  gl_FragColor = vec4(diffuse, finalOpacity);    
}