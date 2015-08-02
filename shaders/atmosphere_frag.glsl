varying vec3 vNormal;
uniform vec3 atmosphereColor;
uniform float intensity;
void main(){
  float localIntensity = pow(0.8 - dot(vNormal, vec3(0, 0, 1.0)), intensity);
  gl_FragColor = vec4(atmosphereColor, 1.0) * localIntensity;
}