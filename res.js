let options = {
    populate: 'maKhoa.name, maGiangVien, maSinhVien'
};
if (options.populate) {
    options.populate.split(',').forEach(populateOption => {
        console.log(populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({
                path: b,
                populate: a
            }))
        );
    });
}