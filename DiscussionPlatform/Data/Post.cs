using System.Collections.Generic;

namespace DiscussionPlatform.Data
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty; 
        public string Author { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Content { get; set; } = string.Empty;
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
