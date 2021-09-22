using System.ComponentModel.DataAnnotations.Schema;

namespace Visaji.Models
{
    [Table("customers")]
    public class Customer
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("customer_id")]
        public int Id { get; set; }

        [Column("fullname")]
        public string Fullname { get; set; }

        [Column("identity_number")]
        public string IdentityNumber { get; set; }

        public Credit Credit { get; set; }
    }
}
