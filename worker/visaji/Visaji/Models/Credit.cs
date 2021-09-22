using System.ComponentModel.DataAnnotations.Schema;

namespace Visaji.Models
{
    [Table("credits")]
    public class Credit
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("credit_id")]
        public int Id { get; set; }

        [Column("upload_url_path")]
        public string UploadUrlPath { get; set; }
        
        [Column("property_url_original")]
        public string PropertyUrlOriginal { get; set; }

        [Column("property_url_modified")]
        public string PropertyUrlModified { get; set; }

        [Column("format_credit_url")]
        public string FormatCreditUrl { get; set; }
        
        [Column("amount_requested", TypeName = "decimal(18,0)")]
        public decimal AmmountRequested { get; set; }

        [Column("comments")]
        public string Comments { get; set; }

        [ForeignKey("Customer")]
        [Column("customer_id")]
        public int CustomerId { get; set; }

        public Customer Customer { get; set; }
    }
}
