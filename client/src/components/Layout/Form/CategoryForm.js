import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                <div className="mb-3 w-50 mr-3">
                    <input
                        type="text"
                        className="form-control fs-1 fw-semibold"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-success ">
                    Gửi
                </button>
            </form>
        </>
    );
};

export default CategoryForm;
