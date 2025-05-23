import { useState } from "react";

const FAQ = () => {
    const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

    const faqData = [
        {
            question: "What is core aeration?",
            answer: "Core aeration is a lawn care process that removes small plugs of soil from the ground. This relieves compaction, improves airflow, and allows water and nutrients to reach grass roots more effectively."
        },
        {
            question: "How do I know if my lawn needs core aeration?",
            answer: "If your lawn feels hard, drains poorly, develops bare patches, or has heavy foot traffic or thick thatch, it's likely time to core aerate. Lawns with clay soil are especially prone to compaction. Each growing season is recommended."
        },
        {
            question: "When is the best time to core aerate my lawn?",
            answer: "• Cool-season grasses (like Kentucky bluegrass or fescue): Early spring or fall\n• Warm-season grasses (like Bermuda or zoysia): Late spring to early summer\n• Avoid core aerating during peak stress periods like mid-summer heat for cool-season grasses."
        },
        {
            question: "How often should I aerate my lawn?",
            answer: "• Clay soil or high foot traffic: Twice per year each growing season\n• Loamy or moderate use: Twice per year each growing season\n• Low-traffic lawns: Every 1-2 times per year\n• Sandy lawns: Microbial aeration is recommended 2 times per year"
        },
        {
            question: "What happens to the soil plugs after core aeration?",
            answer: "The small plugs of soil and thatch will naturally break down over time. As they decompose, they return valuable nutrients back to the lawn."
        },
        {
            question: "Can I mow or fertilize after core aeration?",
            answer: "Yes! In fact, core aerating before fertilizing helps nutrients reach the root zone more effectively. Wait a day or two before mowing to allow the soil to settle."
        },
        {
            question: "What are the benefits of a healthy lawn?",
            answer: "• Healthy grass produces enough oxygen to sustain a family of four for an entire year\n• Lawns improve soil filtration, helping to purify rainwater\n• The combined front lawns of eight average homes can have the same cooling effect as 70 tons of air conditioning\n• Grass captures an estimated 12 million tons of dust and dirt annually\n• Lawns act as a carbon sink—U.S. lawns could store up to 37 billion pounds of carbon annually"
        },
        {
            question: "What should I avoid when core aerating?",
            answer: "Key things to avoid:\n• Poor timing: Don't aerate when soil is too dry/wet or during drought\n• Improper equipment: Always use a core aerator, not a spike aerator\n• Neglecting preparation: Mark obstacles and utilities before starting\n• Poor aftercare: Avoid heavy traffic and let soil plugs decompose naturally"
        }
    ];

    const toggleQuestion = (index: number) => {
        setActiveQuestion(activeQuestion === index ? null : index);
    };
    return (
        <>
           <section className="py-16 bg-white mt-10">
                <div className="container mx-auto px-4">
                    <div id="faq" className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-[#2C3E50] mb-12 text-center">
                            Frequently Asked Questions
                        </h2>
                        
                        <div className="space-y-4">
                            {faqData.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <button
                                        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                                        onClick={() => toggleQuestion(index)}
                                    >
                                        <span className="text-lg font-semibold text-[#2C3E50]">{item.question}</span>
                                        <span className={`transform transition-transform duration-200 ${activeQuestion === index ? 'rotate-180' : ''}`}>
                                            ▼
                                        </span>
                                    </button>
                                    
                                    <div 
                                        className={`px-6 py-4 bg-white transition-all duration-300 ease-in-out ${
                                            activeQuestion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                        }`}
                                    >
                                        <p className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html:( item.answer).split('\n').map(line => `<p>${line}</p>`).join('') }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default FAQ;
