import React from "react";
import '@testing-library/jest-dom'
import {render, screen} from  '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";
import CreateBlog from "./createBlog";

describe("Blog list test" , () => {

    const newBlog = {
        title: 'blog title',
        author: 'blog author',
        likes: 1,
        url: 'blog url',
        users: [{name:'Samson Awokunle'}]
    }
  
    let container;
    const user = userEvent.setup()
    const handleClick = jest.fn();
   
  

    beforeEach(() => {                 
        container = render(            
            <Blog blog={newBlog} handleBlogLikes={handleClick}/>
        ).container
    }) 

    test(' blog renders only title and author by default', async () => {        
        const details = container.querySelector('.detailBlog')
        expect(details).toHaveStyle('display:none')
    })

    test(" blog renders the blog's details ", async () => {         
        const viewButton = screen.getByText('View')
        await user.click(viewButton)

        screen.getByText(1)
        screen.getByText('blog url')
        
        const details = container.querySelector('.detailBlog')

        expect(details).not.toHaveStyle('display:none')
    })

    test("like button is clicked twice, the event handler is called twice", async () => {
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(handleClick.mock.calls).toHaveLength(2)
    })

    
} )

test("test for the new blog form", async () => {

    const handleCreateBlog = jest.fn()
    const user = userEvent.setup()

    const {container} = render(
        <CreateBlog createNewBlog={handleCreateBlog}/>
    )

    const titleInputField = screen.getByPlaceholderText('title')
    const authorInputField = screen.getByPlaceholderText('author')
    const likeInputField = screen.getByPlaceholderText('likes')
    const urlInputField = screen.getByPlaceholderText('url')
    const createBlogButton = screen.getByText('Create New Blog')

    //screen.debug(createBlogButton)

    await user.type(titleInputField, 'blog tilte')
    await user.type(authorInputField , 'blog author')
    await user.type(likeInputField, 'blog like')
    await user.type(urlInputField, 'blog url')
    await user.click(createBlogButton)

    expect(handleCreateBlog).toHaveBeenCalledWith({"author": "blog author", "likes": "blog like", "title": "blog tilte", "url": "blog url"})
    expect(handleCreateBlog.mock.calls).toHaveLength(1)
})