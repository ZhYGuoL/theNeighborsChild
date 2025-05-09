'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LinkedInProfile } from '@/utils/linkedinScraper';

interface LinkedInProfileDisplayProps {
  profile: LinkedInProfile;
}

export default function LinkedInProfileDisplay({ profile }: LinkedInProfileDisplayProps) {
  const { name, headline, education, experience, skills } = profile;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{name || 'LinkedIn Profile'}</CardTitle>
        {headline && <p className="text-muted-foreground">{headline}</p>}
      </CardHeader>
      <CardContent className="space-y-6">
        {education && education.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Education</h3>
            <ul className="space-y-2">
              {education.map((edu, index) => (
                <li key={index} className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                  {edu}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Separator />
        
        {experience && experience.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Experience</h3>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                  <h4 className="font-medium">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-xs">{exp.date_range}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Separator />
        
        {skills && skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 