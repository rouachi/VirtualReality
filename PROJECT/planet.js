function createPlanet(planet_mesh, position, size, shader){

  planet_mesh.model = glMatrix.mat4.translate(planet_mesh.model,
                                               planet_mesh.model,
                                               glMatrix.vec3.fromValues(position));


  planet_mesh.model = glMatrix.mat4.scale(planet_mesh.model, planet_mesh.model,
                                              glMatrix.vec3.fromValues(size));

  return planet_mesh;
}

function drawPlanet(planet_mesh, tex_PlanetMesh, u_tex_PlanetMesh, camera, shader, itM, u_itM, deltaTime, axis){

  shader.use();
  var unif = shader.get_uniforms();
  view = camera.get_view_matrix();
  gl.uniformMatrix4fv(unif['view'], false, view);
  gl.uniformMatrix4fv(unif['proj'], false, projection);

  planet_mesh.activate(shader);
  gl.uniformMatrix4fv(unif['model'], false, planet_mesh.model);
  var itM = glMatrix.mat4.create();
  itM = glMatrix.mat4.invert(itM, planet_mesh.model);
  itM = glMatrix.mat4.transpose(itM, itM);
  gl.uniformMatrix4fv(u_itM, false, itM);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, tex_PlanetMesh);
  gl.uniform1i(u_tex_PlanetMesh, 0);


  planet_mesh = glMatrix.mat4.rotate(planet_mesh.model, planet_mesh.model,
                                                          deltaTime/3600,
                                                           glMatrix.vec3.fromValues(axis));

  planet_mesh.draw();

}
