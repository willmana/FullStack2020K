import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm';

describe('Blog.js', () => {
    test('renders only title and author by default', () => {
        const blog = {
            title: "testiblog",
            author: "testiauthor",
            url: "testiurl",
            likes: 42,
            user: { name: "tester" }
        }

        const user = {
            name: "tester"
        }
        const component = render(
            <Blog blog={blog} user={user} />
        )
        const pintatiedot = component.container.querySelector('.pintatiedot')
        expect(pintatiedot).toHaveTextContent(
            'testiblog, testiauthor'
        )
        const tarkattiedot = component.container.querySelector('.tarkemmat')
        expect(tarkattiedot).toHaveStyle('display: none')
    })
    test('renders also url and likes after view-button is pressed', () => {
        const blog = {
            title: "testiblog",
            author: "testiauthor",
            url: "testiurl",
            likes: 42,
            user: { name: "tester" }
        }

        const user = {
            name: "tester"
        }

        const component = render(
            <Blog blog={blog} user={user} />
        )

        const button = component.getByText('view')
        fireEvent.click(button)
        const tarkattiedot = component.container.querySelector('.tarkemmat')
        expect(tarkattiedot).not.toHaveStyle('display: none')
    })
    test('like-button gives correct amount of function calls', () => {
        const blog = {
            title: "testiblog",
            author: "testiauthor",
            url: "testiurl",
            likes: 42,
            user: { name: "tester" }
        }

        const user = {
            name: "tester"
        }
        const mockHandler = jest.fn()
        const component = render(
            <Blog blog={blog} user={user} like={mockHandler} />
        )

        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)
        expect(mockHandler.mock.calls.length).toBe(2)
    })
})

describe('BlogForm.js', () => {
    test('... gives correct values', () => {
        const createBlog = jest.fn()
        const component = render(
            <BlogForm createBlog={createBlog} />
        )
        const titleInput = component.container.querySelector('#title')
        const authorInput = component.container.querySelector('#author')
        const urlInput = component.container.querySelector('#url')
        const form = component.container.querySelector('form')
        fireEvent.change(titleInput, {
            target: { value: 'testiTitle' }
        })
        fireEvent.change(authorInput, {
            target: { value: 'testiAuthor' }
        })
        fireEvent.change(urlInput, {
            target: { value: 'testiUrl' }
        })
        fireEvent.submit(form)
        expect(createBlog.mock.calls.length).toBe(1)
        expect(createBlog.mock.calls[0][0].title).toBe('testiTitle')
        expect(createBlog.mock.calls[0][0].author).toBe('testiAuthor')
        expect(createBlog.mock.calls[0][0].url).toBe('testiUrl')
    })

})