import React from "react";
import { Link, useParams } from "react-router-dom";

import bg1 from "../assets/images/hero/bg.jpg"
import image1 from "../assets/images/blog/01.jpg"

import Navbar from "../components/navbar";
import BlogsSidebars from "../components/blogsSidebars";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import { blogData, commentsData } from "../data/data";

export default function BlogDetail(){
    let params = useParams();
    let id = params.id

    let data = blogData.find((blog)=>blog.id === parseInt(id))
    return(
        <>
        <Navbar navClass="defaultscroll sticky" navLight={true}/>
        <section className="bg-half-170 d-table w-100" style={{backgroundImage:`url(${bg1})`, backgroundPosition:'top'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="title-heading text-center">
                            <span className="badge bg-primary">{data?.tag ? data.tag : 'Jobnova'}</span>
                            <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark mt-4">{data?.title ? data.title  : 'Sử Dụng Banner Stands Để Tăng Lưu Lượng Truy Cập Tại Triển Lãm Thương Mại'}</h5>

                            <ul className="list-inline text-center mb-0">
                                <li className="list-inline-item mx-4 mt-4">
                                    <span className="text-white-50 d-block">Tác giả</span>
                                    <Link to="#" className="text-white title-dark">{data?.company ? data.company : 'Facebook'}</Link>
                                </li>

                                <li className="list-inline-item mx-4 mt-4">
                                    <span className="text-white-50 d-block">Ngày</span>
                                    <span className="text-white title-dark">{data?.date ? data.date : '19 tháng 6, 2023'}</span>
                                </li>

                                <li className="list-inline-item mx-4 mt-4">
                                    <span className="text-white-50 d-block">Thời gian đọc</span>
                                    <span className="text-white title-dark">{data?.time ? data.time : '8 phút đọc'}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="position-middle-bottom">
                    <nav aria-label="breadcrumb" className="d-block">
                        <ul className="breadcrumb breadcrumb-muted mb-0 p-0">
                            <li className="breadcrumb-item"><Link to="/">Jobnova</Link></li>
                            <li className="breadcrumb-item"><Link to="/blogs">Blogs</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Chi Tiết</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
        <div className="position-relative">
            <div className="shape overflow-hidden text-white">
                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>

        <section className="section">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8 col-md-7">
                        <div className="card border-0 shadow rounded overflow-hidden">
                            <img src={data?.image ? data?.image : image1} className="img-fluid" alt=""/>

                            <div className="card-body">
                                <p className="text-muted">Văn bản giả nổi tiếng nhất là 'Lorem Ipsum', được cho là xuất hiện vào thế kỷ 16. Lorem Ipsum được viết bằng ngôn ngữ giả Latinh mà phần lớn tương ứng với tiếng Latinh 'đúng'. Nó chứa một loạt các từ Latinh thực sự. Văn bản giả cổ đại này cũng không thể hiểu được, nhưng nó bắt chước nhịp điệu của hầu hết các ngôn ngữ châu Âu trong chữ Latinh. Ưu điểm của nguồn gốc Latinh và tính chất vô nghĩa tương đối của Lorem Ipsum là văn bản không thu hút sự chú ý vào chính nó hoặc làm người xem mất tập trung khỏi bố cục.</p>
                                <p className="text-muted">Vì vậy, Lorem Ipsum chỉ phù hợp có hạn như một chất làm đầy hình ảnh cho các văn bản tiếng Đức. Nếu văn bản điền được dự định minh họa các đặc điểm của các kiểu chữ khác nhau, đôi khi có ý nghĩa để chọn các văn bản chứa các chữ cái và ký hiệu khác nhau đặc trưng cho ngôn ngữ đầu ra.</p>
                            
                                <blockquote className="text-center mx-auto blockquote"><i className="mdi mdi-format-quote-open mdi-48px text-muted opacity-2 d-block"></i> Người đàn ông trở về qua cánh cửa trên tường sẽ không bao giờ giống như người đàn ông đã đi ra ngoài. <small className="d-block text-muted mt-2">- Mẫu Jobnova</small></blockquote>
                            
                                <p className="text-muted">Hiện tại có rất nhiều văn bản giả có thể đọc được. Chúng thường được sử dụng khi một văn bản cần thiết chỉ để lấp đầy không gian. Các lựa chọn thay thế cho các văn bản Lorem Ipsum cổ điển thường hài hước và kể những câu chuyện ngắn, hài hước hoặc vô nghĩa.</p>
                            
                                <Link to="#" className="badge badge-link bg-primary">Tối Giản</Link>
                                <Link to="#" className="badge badge-link bg-primary">Nội Thất</Link>
                                <Link to="#" className="badge badge-link bg-primary">Nội Thất</Link>
                            </div>
                        </div>

                        <div className="card shadow rounded border-0 mt-4">
                            <div className="card-body">
                                <h5 className="card-title mb-0">Bình Luận :</h5>

                                <ul className="media-list list-unstyled mb-0">
                                    {commentsData.map((item,index)=>{
                                        return(
                                        <li className="mt-4" key={index}>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <Link className="pe-3" to="#">
                                                        <img src={item.image} className="img-fluid avatar avatar-md-sm rounded-circle shadow" alt="img"/>
                                                    </Link>
                                                    <div className="commentor-detail">
                                                        <h6 className="mb-0"><Link to="#" className="text-dark media-heading">{item.name}</Link></h6>
                                                        <small className="text-muted">{item.time}</small>
                                                    </div>
                                                </div>
                                                <Link to="#" className="text-muted"><i className="mdi mdi-reply"></i> Trả lời</Link>
                                            </div>
                                            <div className="mt-3">
                                                <p className="text-muted fst-italic p-3 bg-light rounded">{item.desc}</p>
                                            </div>
                                        </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="card shadow rounded mt-4">
                            <div className="card-body">
                                <h5 className="card-title mb-0">Để Lại Bình Luận :</h5>

                                <form className="mt-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Bình Luận Của Bạn</label>
                                                <textarea id="message" placeholder="Bình Luận Của Bạn" rows="5" name="message" className="form-control" required=""></textarea>
                                            </div>
                                        </div>
    
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label">Tên <span className="text-danger">*</span></label>
                                                <input id="name" name="name" type="text" placeholder="Tên" className="form-control" required=""/>
                                            </div>
                                        </div>
    
                                        <div className="col-lg-6">
                                            <div className="mb-3">
                                                <label className="form-label">Email Của Bạn <span className="text-danger">*</span></label>
                                                <input id="email" type="email" placeholder="Email" name="email" className="form-control" required=""/>
                                            </div>
                                        </div>
    
                                        <div className="col-md-12">
                                            <div className="send d-grid">
                                                <button type="submit" className="btn btn-primary">Gửi Tin Nhắn</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <BlogsSidebars/>
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}
