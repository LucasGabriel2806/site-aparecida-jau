using api_aparecida_jau.Data;
using api_aparecida_jau.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api_aparecida_jau.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Usuario usuario)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // verifica se email já existe
            var emailExiste = await _context.Usuarios
                .AnyAsync(u => u.Email == usuario.Email);

            if (emailExiste)
                return BadRequest("Email já cadastrado");

            // GERA HASH DA SENHA
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(usuario.Senha);

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                usuario.Id,
                usuario.Email,
                usuario.Tipo
            });
        }

        // LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest login)
        {
            var user = await _context.Usuarios
                .FirstOrDefaultAsync(u =>
                    u.Email == login.Email);

            if (user == null)
                return Unauthorized("Email ou senha inválidos");

            // COMPARA SENHA COM HASH
            bool senhaValida = BCrypt.Net.BCrypt.Verify(
                login.Senha,
                user.Senha
            );

            if (!senhaValida)
                return Unauthorized("Email ou senha inválidos");

            return Ok(new
            {
                user.Id,
                user.Email,
                user.Tipo
            });
        }
    }
}