varying vec2 test;

void main() {
  test = uv;
  gl_Position = vec4( position, 1.0 );
}