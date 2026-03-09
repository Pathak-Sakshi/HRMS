// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Sequelize Validation Error
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors
    });
  }

  // Sequelize Unique Constraint Error
  if (err.name === "SequelizeUniqueConstraintError") {
    const field = Object.keys(err.fields)[0];
    return res.status(409).json({
      success: false,
      message: `${field} must be unique`,
      errors: [{ field, message: `This ${field} already exists` }]
    });
  }

  // Sequelize Foreign Key Constraint Error
  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      success: false,
      message: "Invalid reference",
      errors: [{ message: "The referenced record does not exist" }]
    });
  }

  // Sequelize Database Connection Error
  if (err.name === "SequelizeConnectionError") {
    return res.status(503).json({
      success: false,
      message: "Database connection error"
    });
  }

  // Default Server Error
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

module.exports = errorHandler;
