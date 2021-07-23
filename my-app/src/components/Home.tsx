import React from 'react';
import { Pagination } from '@material-ui/lab';
import { useBlog } from '../hooks/useBlog';
import PrevViewBlog from './PrevViewBlog';
import { useStyles } from '../styles/HomeStyles';
import useHandlePagination from '../hooks/useHandlePagination';

interface Props {
    params: {
        page: string
    }
}
const Home = ({ params }: Props): JSX.Element => {
    const classes = useStyles();
    const { getBlogPage, Blogs, handleGetLengthBlog } = useBlog();
    const {
        handlePaginationChange, count, currentPage, slice,
    } = useHandlePagination({ params: typeof params.page === 'number' ? { page: +params.page } : { page: 1 }, getBlogPage, handleGetLengthBlog });

    return (
        <div>
            {!!Blogs.blogs.length && (
                <div className={classes.homeContainer}>
                    <h1>Blog</h1>
                    <p>Hello I m a Home </p>
                    <div className={classes.homeContainerBlogs}>
                        {slice[currentPage] && Blogs.blogs.slice(...slice[currentPage]).map(({
                            title, contentText, blog_id, img,
                        }) => (<PrevViewBlog key={blog_id} img={img} title={title} contentText={contentText} style={{ margin: '15px' }} />))}
                    </div>
                    <div className={classes.homeContainerPagination}>
                        {count > 1 && (
                            <Pagination
                                style={{ marginBottom: 10 }}
                                count={count}
                                page={currentPage}
                                onChange={(_, page) => handlePaginationChange(page)}
                                color="primary"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
