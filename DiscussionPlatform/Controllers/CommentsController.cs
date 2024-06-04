using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DiscussionPlatform.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscussionPlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly DiscussionContext _context;

        public CommentsController(DiscussionContext context)
        {
            _context = context;
        }

        // GET: api/Comments/Post/5
        [HttpGet("Post/{postId}")]
        public async Task<ActionResult<IEnumerable<Comment>>> GetCommentsForPost(int postId)
        {
            return await _context.Comments
                .Where(c => c.PostId == postId && c.ParentCommentId == null)
                .Include(c => c.Replies)
                .ToListAsync();
        }

        // POST: api/Comments
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            // Haal de bijbehorende post op en koppel deze aan de comment
            var post = await _context.Posts.FindAsync(comment.PostId);
            if (post == null)
            {
                return BadRequest("Invalid postId");
            }
            comment.Post = post;

            comment.CreatedAt = DateTime.UtcNow;
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCommentsForPost), new { postId = comment.PostId }, comment);
        }
    } 
}
