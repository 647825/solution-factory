using Microsoft.EntityFrameworkCore;

namespace DiscussionPlatform.Data
{
    public class DiscussionContext : DbContext
    {
        public DiscussionContext(DbContextOptions<DiscussionContext> options)
        : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
