import React from 'react';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
    return (
        <div className="card mt-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img className="card-img-top" src='https://coursereport-s3-production.global.ssl.fastly.net/uploads/school/logo/219/original/CT_LOGO_NEW.jpg' alt="random" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h6 className="card-subtitle text-muted">{ post.date_created }</h6>
                        <h5 className="card-title">{ post.title }</h5>
                        <h6 className="card-subtitle">By: { post.author.username }</h6>
                        <p className="card-text">{ post.content }</p>
                        <div className="container">
                        
                        {loggedIn ? (
                            <>
                            <Link className='btn btn-primary mx-2' to={`/posts/${post.id}`}>Edit</Link>
                            <Link className='btn btn-primary mx-2' to={`/delete/${post.id}`}>Delete</Link>
                            <Link className='btn btn-primary mx-2' to={`/posts/${post.id}`}>See More</Link>
                            </>
                        ) : (
                            <>
                            <Link className='btn btn-primary mx-2' to={`/single/${post.id}`}>See More</Link>                        
                        </>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}