import { testimonials } from "../constants";
import TextTitle from "./TextTitle";

const TestimonialsSection = () => {
  return (
    <section className="mt-14">
      <div className="text-center mb-12">
        <TextTitle title="Reviews" styles="mb-8" />
        {/* <h2 className="text-3xl font-bold text-primary mb-4">
          What Readers Say
        </h2> */}
        <p className="text-content max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our community has to say.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 rounded-lg shadow-md bg-card">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 text-primary mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>

            <blockquote className="text-content mb-4">
              "{testimonial.quote}"
            </blockquote>
            <div className="text-base font-medium">{testimonial.author}</div>
            <div className="text-sm text-content">{testimonial.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
