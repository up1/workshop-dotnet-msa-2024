using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Article
{
    [Table("articles")]
    public class ArticleModel
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("title")]
        public required string Title { get; set; }
        [Column("content")]
        public required string Content { get; set; }
        [Column("publisheddate")]
        public DateTime CreatedAt { get; set; }
    }
}