using System.Collections.Generic;
using Newtonsoft.Json;
using System;
namespace DiscussionPlatform.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public string Author { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int PostId { get; set; }
        [JsonIgnore]
        public Post? Post { get; set; }
        public int? ParentCommentId { get; set; }
        public Comment? ParentComment { get; set; }
        public List<Comment> Replies { get; set; } = new List<Comment>();
    }
}
