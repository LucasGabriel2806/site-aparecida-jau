using System.ComponentModel.DataAnnotations;

namespace api_aparecida_jau.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Senha { get; set; } // vai armazenar HASH

        [Required]
        public string Tipo { get; set; } // admin ou user
    }
}