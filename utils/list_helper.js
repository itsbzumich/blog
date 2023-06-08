const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

  const mostLikes = (blogs) => {
    cur=blogs[0]
    for(i=1;i<blogs.length;i++){
        if(blogs[i].likes>cur.likes){
            cur=blogs[i]
        }
    }
    ret={
        title: cur.title,
        author: cur.author,
        likes: cur.likes
    }
    return ret
  }


  module.exports = {
    dummy,
    totalLikes,
    mostLikes
  }
  