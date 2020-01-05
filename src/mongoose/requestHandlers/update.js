import httpStatus from 'http-status';
import { NotFound } from '../../errors';

const update = (req, res) => {
  req.model.findOne({ _id: req.params.id }, '', {}, (err, doc) => {
    if (!doc) {
      res.status(httpStatus.NOT_FOUND).json(new NotFound());
      return;
    }

    Object.assign(doc, req.body);

    doc.save((saveError) => {
      if (saveError) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: saveError });
        return;
      }

      res.status(httpStatus.OK).json({
        message: 'success',
        result: doc.toJSON({ virtuals: true }),
      });
    });
  });
};

export default update;